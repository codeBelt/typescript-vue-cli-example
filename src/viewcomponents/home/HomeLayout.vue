<template>
    <div class="homeLayout">
        <article class="homeLayout-content">
            <div v-if="!currentCategory">Select a category</div>
            <div v-else="currentCategory"><CategoryDisplay /></div>
        </article>
        <aside class="homeLayout-links"><CategoryMenu /></aside>
        <aside class="homeLayout-info">Ads</aside>
        <footer class="homeLayout-footer">Footer</footer>
    </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import CategoryMenu from '@/viewcomponents/home/components/CategoryMenu.vue';
import {SwapiActionEnum} from '@/stores/swapi/SwapiModuleAction';
import {SwapiGetterEnum} from '@/stores/swapi/SwapiModuleGetter';
import {SwapiAction, SwapiGetter} from '@/stores/swapi/SwapiModule';
import CategoryDisplay from '@/viewcomponents/home/components/CategoryDisplay.vue';

@Component({
    components: {
        CategoryMenu,
        CategoryDisplay,
    },
})
export default class HomeLayout extends Vue {
    @SwapiGetter(SwapiGetterEnum.currentCategory) currentCategory;

    @SwapiAction(SwapiActionEnum.loadCategories) loadCategories;

    mounted(): void {
        this.loadCategories();
    }
}
</script>

<style scoped lang="scss"></style>
