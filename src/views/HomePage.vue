<template>
    <div>
        <Header />
        <HomeLayout />
    </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import HomeLayout from '@/viewcomponents/home/HomeLayout.vue';
import Header from '@/viewcomponents/components/Header.vue';

@Component({
    components: {
        HomeLayout,
        Header,
    },
})
export default class Home extends Vue {}
</script>
