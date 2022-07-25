<template>
    <div class='component'>
        <div class='container'>

            <div class="grid gap-40 md-col-2 auto">
                <div class='grid gap-40 align-content-start'>
                    <form class="grid md-col-2 auto gap-5" @submit.prevent="addItem()" @keyup="checkItem()"
                        @keydown.esc="clearItem()">

                        <div class='search relative grid align-items-center'>
                            <input type="text" name="item" placeholder="Add your word" autocomplete="off"
                                v-model="item">
                            <span class='clear-input absolute-right' :class="item ? 'show' : ''"
                                @click="clearItem()">clear</span>
                        </div>
                        <button type="submit" class="black" :class="submitButtonClass">Add</button>
                        <p v-if="item && searchMsg">{{searchMsg}}</p>
                    </form>

                    <!-- <div></div> -->

                    <div v-if='list.length > 0'>
                        <draggable v-model="list" @start="drag=true" @end="drag=false" @update="listUpdate()"
                            class="list grid gap-5 md-col-3 auto align-content-start">
                            <div class="row grid col-2 auto gap-20 justify-content-space-between align-items-center"
                                v-for="(item, index) in list" :key="index">
                                <div>
                                    <p>{{item.w}}</p>
                                </div>
                                <div class="grid justify-items-end font12 delete"><button class="red small"
                                        @click="removeItem(index)">x</button>
                                </div>
                            </div>
                        </draggable>
                    </div>

                    <div v-else>
                        <div class="box grid gap-20 justify-items-start">
                            <p class="maxw500">Please initialize your Word dictionary with 10 000 words or start by
                                adding your own
                                words from scratch.</p>
                            <button class='cta black' @click="initiateDictionary()">Initiate dictionary</button>
                        </div>
                    </div>
                </div>

                <div class='grid gap-40'>
                    <div class="filter grid gap-10 align-items-start align-content-start justify-items-start">
                        <div class='grid col-2 auto align-items-center gap-20' @click="sortListByDefault()">Sort:
                            Default
                            <div v-show="sortBy === 'default'" class='point'></div>
                        </div>
                        <div class='grid col-2 auto align-items-center gap-20' @click="sortListByTextAZ()">Sort: A-Z
                            <div v-show="sortBy === 'textAZ'" class='point'></div>
                        </div>
                        <div class='grid col-2 auto align-items-center gap-20' @click="sortListByTextZA()">Sort: Z-A
                            <div v-show="sortBy === 'textZA'" class='point'></div>
                        </div>
                        <!-- <div class='grid col-2 auto align-items-center gap-20' @click="sortListByDateAdded()">Sort by
                            Added Date <div v-show="sortBy === 'date'" class='point'></div>
                        </div> -->
                    </div>
                    <div class="p20 font12 align-self-end">
                        <a href='https://github.com/tomasSlouka/worklio.upforweb.com' target="_blank">See the code at
                            GitHub.</a>
                        <p>© {{ new Date().getFullYear() }} by tomasSlouka</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                item: "",
                submitButtonClass: "ghost",
                sortBy: "default",
                searchMsg: "",
                list: [],
            }
        },

        methods: {
            async initiateDictionary() {
                await this.$axios.$get('https://run.mocky.io/v3/8927ae0a-baa2-4c0f-b2e5-4d63727ea4e3')
                    .then((response) => {
                        console.log(response);
                        localStorage.setItem("list", JSON.stringify(response));
                    }, (error) => {
                        console.log(error);
                    });
            },
            listUpdate() {
                localStorage.setItem("list", JSON.stringify(this.list));
            },
            addItem() {
                if (this.checkItem() === true) {
                    this.list.unshift({ w: this.item })
                    this.saveToLocalStorage()
                    this.item = ''
                    this.submitButtonClass = 'ghost'
                }
            },
            removeItem(index) {
                this.list.splice(index, 1);
                this.saveToLocalStorage()
            },
            checkItem() {
                var findItemInList = this.list.find(x => x.w === this.item)
                var check = (this.item && !findItemInList) ? true : false
                this.submitButtonClass = check ? '' : 'ghost'
                this.searchMsg = check ? '' : 'This word already exists in your dictionary.'
                return check
            },
            clearItem() {
                this.submitButtonClass = 'ghost'
                this.item = ""
            },
            sortListByDefault() {
                this.sortBy = "default"
                this.list = JSON.parse(localStorage.getItem('list')) || []
            },
            sortListByTextAZ() {
                this.sortBy = "textAZ"
                this.list = this.$_.orderBy(this.list, 'w', 'asc');
            },
            sortListByTextZA() {
                this.sortBy = "textZA"
                this.list = this.$_.orderBy(this.list, 'w', 'desc');
            },
            // sortListByDateAdded() {
            //     this.sortBy = "date"
            //     this.list = this.$_.orderBy(this.list, 'date_added', 'desc');
            // },
            saveToLocalStorage() {
                if (process.client) {
                    localStorage.setItem("list", JSON.stringify(this.list));
                }
            }
        },
        mounted() {
            if (process.client) {
                this.list = JSON.parse(localStorage.getItem('list')) || []
            }
        }
    }
</script>

<style scoped>
    input {
        padding: 20px;
        background-color: #fff;
        color: #333;
        border: 0px;
        border-radius: 4px;

        font-size: 1em;
        line-height: 1.688em;
        font-weight: 400;
        outline-color: #B4B9C1;
        display: block;
        width: 100%;
        max-width: 100%;
        max-height: 49px;
        font-family: 'Open Sans', sans-serif;
        box-sizing: border-box;
        -webkit-transition: all 0.2s cubic-bezier(0.165, 0.84, 0.44, 1);
        transition: all 0.2s cubic-bezier(0.165, 0.84, 0.44, 1);
    }

    input::placeholder {
        color: #B4B9C1;
    }

    input:focus {
        border: 0px;
    }

    .row {
        padding: 20px;
        border-radius: 4px;
        background-color: #fff;
        -webkit-transition: all 0.5s cubic-bezier(0.165, 0.84, 0.44, 1);
        transition: all 0.5s cubic-bezier(0.165, 0.84, 0.44, 1);
        border: 1px solid transparent;
    }

    .row:hover {
        /* background-color: #EDEEF1; */
        border: 1px solid #ccc;
    }

    .row:hover .time {
        display: none;
    }

    .row:hover .delete {
        display: grid !important;
    }

    .row .gray {
        color: #B4B9C1;
    }

    .filter>div {
        background-color: #fff;
        padding: 10px 20px;
        border-radius: 4px;
        cursor: pointer;
    }

    .clear-input {
        font-size: 12px;
        color: #B4B9C1;
        cursor: pointer;
        margin-right: 10px;
        display: none;
        border: 1px solid #eee;
        border-radius: 4px;
        padding: 2px 8px;
    }

    .clear-input:hover {
        border: 1px solid #ccc;
        color: #B4B9C1;
    }

    .clear-input.show {
        display: grid;
    }

    .point {
        height: 6px;
        width: 6px;
        border-radius: 6px;
        background-color: green;
    }
</style>