<template>
    <div>
        <div class="header">
            <ul class="menu">
                <li><router-link to="RouteEnum.Home">Home</router-link></li>
                <li><router-link to="/about">About</router-link></li>
            </ul>
            <button type="button" @click="onClickAddModal">Show Modal</button>
        </div>
        <hr />
    </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';

@Component
export default class Header extends Vue {
    onClickAddModal = (event: MouseEvent): void => {
        console.log(`event`, event, this);
        //     const modal: JSX.Element = (
        //         <GenericModal
        //             isRequired={true}
        //             acceptLabel={'Delete'}
        //             rejectLabel={'Cancel'}
        //             message={'This is the modal message passed in.'}
        //         />
        //     );
        //
        //     this.props.dispatch(ModalAction.addModal(modal));
    };
}
</script>

<style scoped lang="scss">
.header {
    align-items: center;
    display: flex;
    justify-content: space-between;
    padding: 10px;
    background-color: #43b4d1;
}

.menu {
    display: flex;

    & > * {
        margin-right: 10px;
    }
}
</style>
