<template>
<div>{{sessionId}}</div>
</template>

<script type="text/ecmascript-6">
  import {utils} from 'adm-portal';

  export default {
    computed: {
      sessionId() {
        return utils.getStore('sessionId');
      }
    }
  };
</script>

<style>
</style>
