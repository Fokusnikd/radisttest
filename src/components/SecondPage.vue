<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Успешный вход</h5>
            <h6 class="card-subtitle mb-2 text-muted">Token available {{moment(dateTime).fromNow()}}</h6>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const moment = require("moment");
export default {
  data() {
    return {
      moment,
      dateTime: ""
    };
  },

  created() {
    this.dateTime = this.$store.getters.userDateTime;
  }
};
</script>
