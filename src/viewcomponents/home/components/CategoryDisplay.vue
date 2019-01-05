<template>
    <div v-if="categoryViewData">
        <div>{{ categoryViewData.displayCount }}</div>
        <ul class="container">
            <li
                v-for="item in categoryViewData.items"
                class="item"
                :key="item.label"
                :data-category="item.category"
                :data-item-id="item.id"
                onclick="onClickItem"
            >
                <CategoryItem :item="item" />
            </li>
        </ul>
        <button
            v-if="categoryViewData.loadMoreUrl"
            type="button"
            :data-load-more-endpoint="categoryViewData.loadMoreUrl"
            :data-category="categoryViewData.category"
            onclick="onClickLoadMore"
        >
            Load More
        </button>
        <div v-if="isLoadingCategory">Loading...</div>
    </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import {SwapiGetterEnum} from '@/stores/swapi/SwapiModuleGetter';
import {SwapiGetter} from '@/stores/swapi/SwapiModule';
import CategoryItem from '@/viewcomponents/home/components/CategoryItem.vue';

@Component({
    components: {
        CategoryItem,
    },
})
export default class CategoryDisplay extends Vue {
    @SwapiGetter(SwapiGetterEnum.categoryViewData) categoryViewData;
    @SwapiGetter(SwapiGetterEnum.isLoadingCategory) isLoadingCategory;

    public onClickItem = (event: MouseEvent) => {
        // const category: CategoryEnum = event.currentTarget.getAttribute('data-category') as CategoryEnum;
        // const itemId: string = event.currentTarget.getAttribute('data-item-id');
        //
        // this.props.dispatch(SwapiAction.loadDetails(itemId, category));
        //
        // const modal: JSX.Element = (
        //     <DetailsModal
        //         category={category}
        // itemId={itemId}
        // />
        // );
        //
        //     this.props.dispatch(ModalAction.addModal(modal));
    };

    public onClickLoadMore = (event: MouseEvent) => {
        // const category: CategoryEnum = event.currentTarget.getAttribute('data-category') as CategoryEnum;
        // const apiEndpoint: string = event.currentTarget.getAttribute('data-load-more-endpoint');
        //
        // this.props.dispatch(SwapiAction.loadCategory({
        //     apiEndpoint,
        //     category,
        // }));
    };
}
</script>

<style scoped lang="scss">
.container {
    display: flex;
    flex-wrap: wrap;
}

.item {
    flex-basis: 100px;
    border: solid 1px green;
    margin: 5px;
    cursor: pointer;
}
</style>
