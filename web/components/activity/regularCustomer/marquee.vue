<template>
    <RCMarquee :itemConfig="itemConfig" :list="marqueeList" />
</template>

<script>
import { mapState } from 'vuex';
import RCMarquee from '../../../../common/activity/regularCustomer/marquee';

export default {
    props: {
        itemConfig: {
            type: Object,
            default() {
                return {
                    property: null,
                };
            },
        },
    },
    components: {
        RCMarquee,
    },
    computed: {
        ...mapState('regularCustomerStore', {
            marqueeList: state => state.marqueeList,
        }),
    },
};
</script>
