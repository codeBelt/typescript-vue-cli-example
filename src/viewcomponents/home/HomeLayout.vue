<template>
    <div class="hello">
        <h1>{{ msg }}</h1>
        {{ categories }}
    </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';
import {SwapiAction, SwapiActionEnum, SwapiGetter, SwapiGetterEnum} from '@/stores/swapi/SwapiModule';

@Component
export default class HomeLayout extends Vue {
    @SwapiAction(SwapiActionEnum.LoadCategories) loadCategories;
    @SwapiGetter(SwapiGetterEnum.categories) categories;

    @Prop() private msg!: string;

    mounted() {
        this.loadCategories();

        console.log(`this.categories`, this.categories);
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
    margin: 40px 0 0;
}
ul {
    list-style-type: none;
    padding: 0;
}
li {
    display: inline-block;
    margin: 0 10px;
}
a {
    color: #42b983;
}
</style>
