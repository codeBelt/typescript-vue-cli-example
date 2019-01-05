<template>
    <div>
        <img :src="item.imageUrl" :alt="item.label" />
        <div>{{ item.label }}</div>
    </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';
import {SwapiModelUnion} from '@/stores/swapi/models/actions/CategoryResponseModel';

@Component
export default class CategoryItem extends Vue {
    @Prop() item: SwapiModelUnion;
}
</script>

<style scoped lang="scss"></style>
