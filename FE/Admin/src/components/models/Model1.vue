<template>
    <div v-if="_showVoucherModal" class="voucher-list-container">
        <div class="voucher-list" ref="voucherList">
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        showVoucherModal: { type: Boolean },
    },
    data() {
        return {
            _showVoucherModal: false,
            count: 0,
        };
    },
    methods: {
        closeModal() {
            this._showVoucherModal = false;
        },

        onOutsideClick(event) {
            if (this.$refs.voucherList && !this.$refs.voucherList.contains(event.target)) {
                if (this.count != 0) {
                    this.closeModal();
                    this.count = 0;
                    this.$emit('closeModel');
                } else {
                    this.count++;
                }
            }
        },
    },
    watch: {
        showVoucherModal(newValue, oldValue) {
            // Your logic here
            if (newValue == true) {
                document.addEventListener('click', this.onOutsideClick);
                this._showVoucherModal = true;
            }
            if (newValue == false) {
                this.count = 0;
                this._showVoucherModal = false;
                document.removeEventListener('click', this.onOutsideClick);
            }
        },
    },
    mounted() {
        // Attach a click event listener to the document to handle clicks outside the modal
    },

    beforeUnmount() {
        // Remove the click event listener when the component is destroyed

        document.removeEventListener('click', this.onOutsideClick);
    },
};
</script>

<style lang="scss" scoped>
.voucher-list-container {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    display: block;

    height: 100%;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    transition: opacity 0.15s linear;
    z-index: 300;
    .voucher-list {
        position: relative;
        max-width: 500px;
        margin: 1.75em auto;
        transition: all 0.3s ease;

        // animation: vouchermodel 7s ease;
    }
}

@keyframes vouchermodel {
    from {
        top: 100px;
    }
    to {
        top: 0;
    }
}
</style>
