<script setup>
</script>
<template>
    <div class="wrapper_store">
        <!-- for show img -->
        <div>
            <img src="../../assets/vue.svg" alt="supplier_img">
        </div>
        <!-- click to chat or view shop profile -->
        <div class="store">
            <h4>
                GardenName
            </h4>
            <div>
                <button>
                    Chat Now 
                </button>
                <button>
                    View Shop
                </button>
            </div>
        </div>
        <!-- for show more information about this supplier -->
        <div class="about_me">
            <!-- rating and Product -->
            <div>
                <!-- rating -->
                <div>
                    <h5>
                        Rating
                    </h5>
                    <h5>
                        4
                    </h5>
                </div>
                <!-- products -->
                <div>
                    <h5>
                        Products
                    </h5>
                    <h5>
                        5
                    </h5>
                </div>
            </div>
            <!-- Response Rate and Response Time -->
            <div>
                <!-- rate -->
                <div>
                    <h5>
                        Response Rate
                    </h5>
                    <h5>
                        100%
                    </h5>
                </div>
                <!-- time -->
                <div>
                    <h5>
                        Response Time
                    </h5>
                    <h5>
                        within hours
                    </h5>
                </div>
            </div>
            <!-- follow and joined -->
            <div>
                <!-- follow -->
                <div>
                    <h5>
                        Follow
                    </h5>
                    <h5>
                        1
                    </h5>
                </div>
                <!-- joined -->
                <div>
                    <h5>
                        Joined
                    </h5>
                    <h5>
                        2 days ago
                    </h5>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
*{
    box-sizing: border-box;
}
.wrapper_store{
    display: flex;
    width: auto;
    height: 120px;
    padding: 20px;
    gap: 20px;
}
.about_me{
    width: 280px;
    height: 80px;
}
.about_me{
    display: flex;
}
</style>