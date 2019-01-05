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
                @click="onClickItem"
            >
                <CategoryItem :item="item" />
            </li>
        </ul>
        <button
            v-if="categoryViewData.loadMoreUrl"
            type="button"
            :data-load-more-endpoint="categoryViewData.loadMoreUrl"
            :data-category="categoryViewData.category"
            @click="onClickLoadMore"
        >
            Load More
        </button>
        <div v-if="isLoadingCategory">Loading...</div>
    </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import {SwapiGetterEnum} from '@/stores/swapi/SwapiModuleGetter';
import {SwapiAction, SwapiGetter} from '@/stores/swapi/SwapiModule';
import CategoryItem from '@/viewcomponents/home/components/CategoryItem.vue';
import CategoryEnum from '@/constants/CategoryEnum';
import {SwapiActionEnum} from '@/stores/swapi/SwapiModuleAction';

@Component({
    components: {
        CategoryItem,
    },
})
export default class CategoryDisplay extends Vue {
    @SwapiGetter(SwapiGetterEnum.categoryViewData) categoryViewData;
    @SwapiGetter(SwapiGetterEnum.isLoadingCategory) isLoadingCategory;

    @SwapiAction(SwapiActionEnum.loadCategory) loadCategory;

    onClickItem = (event: MouseEvent): void => {
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

    onClickLoadMore = (event: MouseEvent): void => {
        const target: HTMLLIElement = event.target as HTMLLIElement;
        const category: CategoryEnum = target.getAttribute('data-category') as CategoryEnum;
        const apiEndpoint: string = target.getAttribute('data-load-more-endpoint');

        this.loadCategory({
            apiEndpoint,
            category,
        });
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
