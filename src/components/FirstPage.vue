<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <form class="needs-validation">
          <div class="form-group">
            <label for="Email">Email address</label>
            <input
              type="email"
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter email"
              v-model="email"
              :class="{'is-invalid':$v.email.$error,
          'is-valid': !$v.email.$error && $v.email.$dirty}"
              @blur="$v.email.$touch()"
            />
            <div class="valid-feedback">Looks good!</div>
            <div class="invalid-feedback" v-if="!$v.email.required">Please enter email.</div>
            <div class="invalid-feedback" v-if="!$v.email.email">Please enter correct email.</div>
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input
              type="password"
              class="form-control"
              id="password"
              placeholder="Password"
              v-model="password"
              :class="{'is-invalid':$v.password.$error,
          'is-valid': !$v.password.$error && $v.password.$dirty}"
              @blur="$v.password.$touch()"
            />
            <div class="valid-feedback">Looks good!</div>
            <div class="invalid-feedback" v-if="!$v.password.required">Please enter your password.</div>
            <div
              class="invalid-feedback"
              v-if="!$v.password.minLength"
            >Min length of password is {{$v.password.$params.minLength.min}}. Now it is {{password.length}}.</div>
          </div>
          <div class="alert alert-warning alert-dismissible fade show" v-if="error" role="alert">
            <strong>Что-то пошло не так!</strong>
            {{error}}
            <button
              @click="cleanError"
              type="button"
              class="close"
              data-dismiss="alert"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <button
            class="btn btn-primary"
            v-if="!$v.email.$error && !$v.password.$error "
            @click.prevent="Login"
          >Login</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { minLength, required, email } from "vuelidate/lib/validators";
export default {
  data() {
    return {
      password: "testpassword",
      email: "testuser@test.com"
    };
  },
  computed: {
    error() {
      return this.$store.getters.error;
    }
  },
  validations: {
    email: {
      email,
      required
    },
    password: {
      minLength: minLength(6),
      required
    }
  },
  methods: {
    cleanError() {
      this.$store.dispatch("cleanError");
    },
    Login() {
      const jsonUser = JSON.stringify({
        password: this.password,
        username: this.email
      });

      this.$store
        .dispatch("loginUser", jsonUser)
        .then(this.$router.push("/secondpage"))
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>
