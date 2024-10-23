<template>
	<el-form
		class="container"
		:inline="inline"
		:label-position="labelPosition"
		:label-width="labelWidth"
		:model="dataSource"
		:rules="rules"
		:ref="refName"
	>
		<el-form-item
			v-for="item in internalFormOptions"
			:key="item.key"
			:label="item.label"
			:prop="item.key"
		>
			<!-- 输入框 -->
			<el-input
				v-if="item.type === 'el-input'"
				v-model="dataSource[item.key]"
				@change="item.props.onChange"
				:placeholder="item.props.placeholder"
				:disabled="item.props.disabled"
				:clearable="item.props.clearable"
				:style="item.style"
			/>

			<!-- 选择框 -->
			<el-select
				v-if="item.type === 'el-select'"
				v-model="dataSource[item.key]"
				size="mini"
				@change="item.props.onChange"
				:placeholder="item.props.placeholder"
				:disabled="item.props.disabled"
				:clearable="item.props.clearable"
				:style="item.style"
			>
				<el-option
					v-for="option in item.props.options"
					:key="option.value"
					:label="option.label"
					:value="option.value"
				/>
			</el-select>

			<!-- 多选 -->
			<el-checkbox-group
				v-if="item.type === 'el-checkbox'"
				style="display:flex;flex-direction:column"
				v-model="dataSource[item.key]"
			>
				<el-checkbox v-for="option in item.props.options" :key="option.value" :label="option.value">
					{{ option.label }}
				</el-checkbox>
			</el-checkbox-group>

			<template v-if="item.type === 'el-tip'">
				<div v-for="(option, index) in item.props.options" :key="index">
					{{ index + 1 }}.{{ option }}
				</div>
			</template>

			<template v-if="item.type === 'el-tag'">
				<el-tag 
					effect="dark"
					v-for="(tag, index) in item.props.options" 
					:key="index"
					closable
  				:disable-transitions="false"
					@close="item.props.onClose(tag)"
					style="margin-right: 10px"
				>{{tag}}</el-tag>
				<el-input
					class="input-new-tag"
					v-if="inputVisible"
					v-model="newTagName"
					ref="saveTagInput"
					size="small"
					@keyup.enter.native="handleInputConfirm(item.props.onAddTag)"
					@blur="handleInputConfirm(item.props.onAddTag)"
				/>
				<el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>

				<div class="preset-tag-container">
					<div @click="item.props.onAddTag(tag)" v-for="(tag, index) of item.props.presetOptions" :key="index" class="preset-tag">
						{{tag}}
					</div>
				</div>
			</template>
		</el-form-item>

		<slot name="upload"></slot>
		<slot name="btn-area"></slot>
	</el-form>
</template>

<script>
// import Upload from '~/base/Upload'

const noop = () => {};

export default {
	props: {
		dataSource: Object,
		/**
		 * [{
		 *  type: 表单组件类型
		 *  key: 唯一标识
		 *  label
		 *  属性均放在 props 中
		 *  props: {
		 *    placeholder
		 *    options: 表单选项
		 *    clearable
		 *    onChange
		 *  },
		 *  style: {}
		 * }]
		 */
		formOptions: {
			type: Array,
			default: () => []
		},
		inline: {
			type: Boolean,
			default: true
		},
		labelPosition: {
			type: String,
			default: 'right'
		},
		labelWidth: String,
		rules: {
			type: Object,
			default: () => {}
		},
		refName: String
	},
	data() {
		return {
			internalFormOptions: [],
			inputVisible: false,
			newTagName: ''
		};
	},
	created() {
		this._initInternalFormOptions();
	},
	methods: {
		_initInternalFormOptions() {
			const internalFormOptions = this.formOptions.map(option => {
				const { onChange, clearable } = option.props;

				if (typeof onChange !== 'function') {
					option.props.onChange = noop;
				}

				option.props.clearable = clearable === false ? false : true;

				return option;
			});

			this.internalFormOptions = internalFormOptions;
		},
		showInput() {
			this.inputVisible = true;
			this.$nextTick(_ => {
				this.$refs.saveTagInput[0].$refs.input.focus();
			});
		},
		handleInputConfirm(onAddTag) {
			if (this.newTagName) {
				onAddTag(this.newTagName)
			}

			this.inputVisible = false;
			this.newTagName = '';
		}
	},
	validate() {
		return this;
	},
	components: {
		// Upload,
		// OSSUpload
	}
};
</script>

<style lang="less" scoped>
.el-tag {
	color: #fff;
	background-color: transparent;
	border: 1px solid rgba(255, 255, 255, .5);
}

.container /deep/ .el-tag {
	.el-icon-close {
		top: 0;
		color: #fff;
		&:hover {
			background: none;
		}
	}
}

.button-new-tag {
	height: 32px;
	padding-top: 0;
	padding-bottom: 0;
}
.input-new-tag {
	width: 90px;
	height: 32px;
}
.preset-tag-container {
	display: flex;
	margin-top: 8px;
	.preset-tag {
		padding: 0 6px;
		min-width: 38px;
		height: 20px;
		line-height: 20px;
		margin-right: 4px;
		background: rgba(255,255,255, .1);
		font-weight: 400;
		font-size: 10px;
		text-align: center;
		color: rgba(255,255,255, .5);
		border-radius: 2px;
		cursor: pointer;
		&:last-child {
			margin-right: 0;
		}
	}
}
</style>
