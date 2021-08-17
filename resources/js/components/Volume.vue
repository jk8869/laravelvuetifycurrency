<template>
    <div>
        <p v-for="volume in volumes" :key="volume.volume">
            {{ volume.volume }}
        </p>
    </div>
</template>

<script>
export default {
    data: () => ({
        volumes: []
    }),
    methods: {
        getVolumeHistory() {
            fetch(
                `https://api.nomics.com/v1/volume/history?key=${process.env.API_KEY}&start=2021-08-17T00:00:00Z&convert=EUR`
            )
                .then(res => res.clone().json())
                .then(res => {
                    console.log(res);
                    this.volumes = res;
                })
                .catch(err => {
                    console.log(err);
                })
                .finally(() => (this.isLoading = false));
        }
    },
    mounted() {
        console.log("runnig");
        this.getVolumeHistory();
    }
};
</script>

<style></style>
