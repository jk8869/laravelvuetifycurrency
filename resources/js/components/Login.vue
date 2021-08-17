<template>
    <v-app id="inspire">
        <v-content>
            <v-container fluid fill-height>
                <v-layout align-center justify-center>
                    <v-flex xs12 sm8 md4>
                        <v-card class="elevation-12">
                            <v-toolbar dark color="primary">
                                <v-toolbar-title>Login form</v-toolbar-title>
                            </v-toolbar>
                            <v-card-text>
                                <v-form>
                                    <v-text-field
                                        prepend-icon="person"
                                        name="login"
                                        label="Login"
                                        type="text"
                                        v-model="email"
                                    ></v-text-field>
                                    <v-text-field
                                        id="password"
                                        prepend-icon="lock"
                                        name="password"
                                        label="Password"
                                        type="password"
                                        v-model="password"
                                    ></v-text-field>
                                </v-form>
                            </v-card-text>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="primary" @click="handleSubmit"
                                    >Login</v-btn
                                >
                            </v-card-actions>
                        </v-card>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-content>
    </v-app>
</template>

<script>
export default {
    name: "Login",
    data() {
        return {
            email: "",
            password: ""
        };
    },
    methods: {
        handleSubmit(e) {
            e.preventDefault();
            const data = new FormData();
            data.append("email", this.email);
            data.append("password", this.password);
            fetch("api/login", { method: "POST", body: data })
                .then(res => res.clone().json())
                .then(response => {
                    window.Laravel.isLoggedin = true;
                    if (response.user.id) {
                        this.$router.push({ name: "volume" });
                    } else {
                        this.error = response.message;
                    }
                })
                .catch(function(error) {
                    console.error(error);
                });
        }
    }
};
</script>
