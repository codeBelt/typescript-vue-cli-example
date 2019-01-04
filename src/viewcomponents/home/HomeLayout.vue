<template>
    <div class="homeLayout">
        <article class="homeLayout-content">
            <div v-if="!currentCategory">Select a category</div>
            <div v-else="currentCategory">CategoryDisplay</div>
        </article>
        <aside class="homeLayout-links"><CategoryMenu /></aside>
        <aside class="homeLayout-info">Ads</aside>
        <footer class="homeLayout-footer">Footer</footer>
    </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';
import {SwapiAction, SwapiActionEnum, SwapiGetter, SwapiGetterEnum} from '@/stores/swapi/SwapiModule';
import CategoryMenu from '@/viewcomponents/components/CategoryMenu.vue';

@Component({
    components: {
        CategoryMenu,
    },
})
export default class HomeLayout extends Vue {
    @SwapiGetter(SwapiGetterEnum.categories) categories;
    @SwapiGetter(SwapiGetterEnum.currentCategory) currentCategory;

    @SwapiAction(SwapiActionEnum.loadCategories) loadCategories;

    @Prop(String) private msg!: string;

    mounted() {
        this.loadCategories();

        console.log(`this.categories`, this.categories);
    }
}
</script>

<style scoped lang="scss"></style>
