export default {
    methods: {
        customeTitle(titleBar) {
            document.title = titleBar.titleView.text;
        },
        goClose() {},
        goBack() {
            this.$router.go(-1);
        }
    }
};
