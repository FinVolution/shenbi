<template>
    <div>
        <!-- <Banner /> -->
        <div class="topbar">
            <div class="header">
                <div class="logo"></div>
                <div class="title"><span>神笔</span></div>
            </div>
            <div class="operation">
                <h3 style="margin-left:10px;color:white;">当前用户：{{username}}</h3>
            </div>
        </div>
    </div>
</template>
<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import { getCookie } from '../../utils'
export default {
    data() {
        return {
            buttonOptions: [],
            currentTenantNameModel: '',
            styleMode: '深色模式',
            username: 'admin'
        }
    },
    components: {
        Banner: () => import('./toolbanner.vue'),

    },
    watch: {
        styleMode(val) {
            if (val === '深色模式') {
                // require('element-theme-dark')
            } else {
                // require('element-ui/lib/theme-chalk/index.css')
            }
        },
        menus: {
            immediate: true,
            deep: true,
            handler(newVal) {
                this.currentTenantNameModel = this.currentTenantName
            }
        },
    },
    computed: {
        ...mapState('tenant', ['menus', 'currentTenantId', 'currentTenantName']),
    },
    methods: {
        ...mapMutations('tenant', ['setCurrentTenantId']),
        ...mapActions('tenant', ['initMenusList']),
        onTenantChange(val) {
            this.currentTenantNameModel = val.name
            this.setCurrentTenantId(val)
            console.log(val)
        },
        onBackVersionClick() {
            this.$router.push('/home/v1')
        }
    },
}
</script>

<style lang="less" scoped>
@import '../../../../assets/less/base/mixins.less';
@asserts: '../../../assets/images';

.topbar {
    z-index: 99;
    .setSize(100vw, 46px);
    min-height: 46px;
    padding: 0 20px 0 20px;
    background: rgba(0, 0, 0, .5);

    .setFlexPos(row, space-between, center);

    .header {
        .setSize(auto, 100%);
        box-sizing: border-box;
        border: 6px solid transparent;
        .setFlexPos(row, flex-start, center);

        .logo {
            .setSize(90px, 100%);
            .setBgImg('@{asserts}/palette/logo.png', center, middle, contain, no-repeat);
        }

        .title {
            color: #fff;
            font-size: 17px;
        }
    }

    .operation {
        .setFlexPos(row, space-between, center);
        .bell {
            font-size: 16px;
            color: #fff;
            margin: 0 10px 0 0;
            cursor: pointer;
        }

        .cancel,
        .save {
            font-size: 12px;
            margin: 0 10px 0 0;
            cursor: pointer;
            color: #fff;

            &:focus {
                outline: none;
            }
        }

        .save {
            padding: 5px 10px;
            border-radius: 3px;
            background-color: #ce2038;
            border: none;
        }

        .cancel {
            background: none;
            border: none;
        }
    }
}
</style>
