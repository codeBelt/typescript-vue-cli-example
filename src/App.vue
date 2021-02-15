<template>
    <div id="app" class="wrapper"><router-view /></div>
</template>

<style lang="scss">
/*
   Globals
 */
@import '~reset-css/sass/reset';
@import '~purecss';
@import './scss/elements';
@import './scss/utils';
@import './scss/modal';

@import './scss/homeLayout';

body {
    background-color: lightgreen;
}

.wrapper {
    max-width: 1200px;
    margin: 0 auto;
}
</style>
