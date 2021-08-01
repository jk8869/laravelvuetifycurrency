<template>
    <v-card>
        <v-toolbar color="orange accent-1">
            <v-app-bar-nav-icon class="hidden-sm-and-down"></v-app-bar-nav-icon>
            <v-toolbar-title class="text-h6 mr-6 hidden-sm-and-down">
                Currency
            </v-toolbar-title>
            <v-autocomplete
                v-model="model"
                :items="items"
                :loading="isLoading"
                :search-input.sync="search"
                chips
                clearable
                hide-details
                hide-selected
                item-text="name"
                item-value="symbol"
                label="Search for a coin..."
                return-object
                solo
            >
                <template v-slot:no-data>
                    <v-list-item>
                        <v-list-item-title>
                            Search for your favorite
                            <strong>Currency</strong>
                        </v-list-item-title>
                    </v-list-item>
                </template>
                <template v-slot:selection="{ attr, on, item, selected }">
                    <v-chip
                        v-bind="attr"
                        :input-value="selected"
                        color="blue-grey"
                        class="white--text"
                        v-on="on"
                    >
                        <v-icon left>
                            mdi-bitcoin
                        </v-icon>
                        <span v-text="item.name"></span>
                    </v-chip>
                </template>
                <template v-slot:item="{ item }">
                    <v-list-item-avatar
                        color="indigo"
                        class="text-h5 font-weight-light white--text"
                    >
                        {{ item.name.charAt(0) }}
                    </v-list-item-avatar>
                    <v-list-item-content>
                        <v-list-item-title
                            v-text="item.name"
                        ></v-list-item-title>
                        <v-list-item-subtitle
                            v-text="item.symbol"
                        ></v-list-item-subtitle>
                    </v-list-item-content>
                    <v-list-item-action>
                        <v-icon>mdi-bitcoin</v-icon>
                    </v-list-item-action>
                </template>
            </v-autocomplete>
            <template v-slot:extension>
                <v-tabs
                    v-model="tab"
                    :hide-slider="!model"
                    color="blue-grey"
                    slider-color="blue-grey"
                >
                    <v-tab :disabled="!model">
                        Currency
                    </v-tab>
                    <v-tab :disabled="!model">
                        Rate
                    </v-tab>
                    <v-tab :disabled="!model">
                        Market
                    </v-tab>
                </v-tabs>
            </template>
        </v-toolbar>
        <v-tabs-items v-model="tab">
            <v-tab-item :key="1">
                <v-card flat>
                    <v-card-text
                        v-if="model"
                        v-text="'Currency: ' + model.currency"
                    ></v-card-text>
                </v-card>
            </v-tab-item>
            <v-tab-item :key="2">
                <v-card flat>
                    <v-card-text
                        v-if="model"
                        v-text="'Price: ' + model.price"
                    ></v-card-text>
                </v-card>
            </v-tab-item>
            <v-tab-item :key="3">
                <v-card flat>
                    <v-card-text
                        v-if="model"
                        v-text="'Market Cap: ' + model.market_cap"
                    ></v-card-text>
                </v-card>
            </v-tab-item>
        </v-tabs-items>
    </v-card>
</template>

<script>
export default {
    data: () => ({
        isLoading: false,
        items: [],
        model: null,
        search: null,
        tab: null
    }),
    watch: {
        model(val) {
            if (val != null) this.tab = 0;
            else this.tab = null;
        },
        search(val) {
            if (this.items.length > 0) return;

            this.isLoading = true;

            fetch(
                `https://api.nomics.com/v1/currencies/ticker?key=${process.env.API_KEY}&interval=1d`
            )
                .then(res => res.clone().json())
                .then(res => {
                    this.items = res;
                })
                .catch(err => {
                    console.log(err);
                })
                .finally(() => (this.isLoading = false));
        }
    }
};
</script>
