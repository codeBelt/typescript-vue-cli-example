<template>
    <div className="pure-menu pure-menu-horizontal">
        <ul className="pure-menu-list">
            <li v-for="item in menuItems" :key="item.category" className="pure-menu-item" @click="onClickMenu">
                <button :class="cssClasses(item)" type="button" :data-category="item.category" :data-endpoint="item.apiEndpoint">
                    {{ item.label }}
                </button>
            </li>
        </ul>
    </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import ICategoryMenu from '@/stores/swapi/models/getters/ICategoryMenu';
import CategoryEnum from '@/constants/CategoryEnum';
import classNames from 'classnames';
import {SwapiActionEnum} from '@/stores/swapi/SwapiModuleAction';
import {SwapiGetterEnum} from '@/stores/swapi/SwapiModuleGetter';
import {SwapiAction, SwapiGetter} from '@/stores/swapi/SwapiModule';

@Component
export default class CategoryMenu extends Vue {
    @SwapiGetter(SwapiGetterEnum.menuItems) menuItems;

    @SwapiAction(SwapiActionEnum.loadCategory) loadCategory;

    cssClasses(item: ICategoryMenu): string {
        return classNames({
            'pure-button': true,
            'pure-button-active': item.isActive,
        });
    }

    public onClickMenu = (event: MouseEvent): void => {
        const target: HTMLLIElement = event.target as HTMLLIElement;
        const category: CategoryEnum = target.getAttribute('data-category') as CategoryEnum;
        const apiEndpoint: string = target.getAttribute('data-endpoint');

        this.loadCategory({
            apiEndpoint,
            category,
        });
    };
}
</script>

<style scoped lang="scss"></style>
