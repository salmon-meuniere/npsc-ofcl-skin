<template>
    <div class="c-card" >
        <div class="c-card__thumb">
            <div v-if="clientWidth < 760" :class="['c-card__user', {'is-now': isLive(stream)}]">
                <div class="mr-1">
                    <Bilibili v-if="stream.pf.bl.exists" />
                    <Youtube v-if="stream.pf.yt.exists" />
                </div>
                <span v-if="stream.stream_host.id == 'outside'" class="c-card__user-name"><Truck :alt="$t('ui.outside')" />{{decodeURIComponent(stream.stream_host.name)}}</span>
                <span v-else class="c-card__user-name">{{$t(`characters.${stream.stream_host.id}`)}}</span>
            </div>

            <a
                :href="getLink(stream)"
                target="_blank"
                :title="decodeURIComponent(stream.stream_title)"
                class="c-card__thumb-link"
            >
            <img
                :src="getThumbnail(stream)"
                :alt="decodeURIComponent(stream.stream_title)"
                loading="lazy"    
            />
            </a>
        </div>
        <div class="c-card__content">
            <div v-if="clientWidth >= 760" :class="['c-card__user', {'is-now': isLive(stream)}]">
                <div class="mr-1">
                    <Bilibili v-if="stream.pf.bl.exists" />
                    <Youtube v-if="stream.pf.yt.exists" />
                </div>
                <span v-if="stream.stream_host.id == 'outside'" class="c-card__user-name"><Truck :alt="$t('ui.outside')" />{{decodeURIComponent(stream.stream_host.name)}}</span>
                <span v-else class="c-card__user-name">{{$t(`characters.${stream.stream_host.id}`)}}</span>
            </div>
            <div class="c-card__title">
                <a :href="getLink(stream)" target="_blank" class="c-card__title-link">
                    {{decodeURIComponent(stream.stream_title)}}
                </a>
            </div>
            <ul class="c-card__icons">
                <li class="c-card__icons-item" v-if="stream.pf.yt.exists && stream.stream_host.id == 'outside'">
                    <a
                        :href="`https://www.youtube.com/channel/${stream.stream_host.channelId}`"
                        :title="decodeURIComponent(stream.stream_host.name)"
                        target="_blank"
                    ><img
                        :src="`https://schedule-api.noripromatome.ml/client-api/getOpenGraph.php?ch=${stream.stream_host.channelId}`"
                        :title="decodeURIComponent(stream.stream_host.name)"
                        class="icon"            
                    /></a>
                </li>
                <li class="c-card__icons-item" v-for="chara in getAttendCharacterArray" :key="chara">
                    <a
                        :href="charaData[chara]['yt-url']"
                        :title="$t(`characters.${chara}`)"
                        target="_blank"
                        
                    ><img
                        :src="`/assets/chara/${charaData[chara]['2key']}.${charaData[chara]['avatar-prefix']}`"
                        :title="$t(`characters.${chara}`)"
                        class="icon"            
                    /></a>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import Truck from '../icons/Truck.vue';
import charaData from '../../assets/charaData.json';
import Bilibili from '../icons/Bilibili.vue';
import Youtube from '../icons/Youtube.vue';
    export default {
    props: {
        stream: {
            type: Object,
            default: () => { }
        }
    },
    computed: {
        getAttendCharacterArray() {
            const attendCharacterArray = [];
            Object.keys(this.stream.np_members).forEach(key => {
                if (this.stream.np_members[key] === true) {
                    attendCharacterArray.push(key);
                }
            });
            return attendCharacterArray;
        },
        clientWidth() {
            return window.innerWidth;
        }
    },
    data() {
        return {
            charaData
        };
    },
    methods: {
        getLink(stream) {
            if (stream.pf.yt.exists && stream.pf.yt.id !== '') {
                return `https://www.youtube.com/watch?v=${stream.pf.yt.id}`;
            } else if(stream.pf.yt.exists && stream.stream_host.id !== 'outside') {
                return this.charaData[stream.stream_host.id]['yt-url'];
            } else if(stream.pf.yt.exists && stream.stream_host.id === 'outside') {
                return `https://www.youtube.com/channel/${stream.stream_host.channelId}`;
            } else if(stream.pf.url.exists && stream.pf.url.li != '') {
                return stream.pf.url.li;
            } else if(stream.pf.bl.exists) {
                return stream.pf.bl.url;
            }
            return '';
        },
        getThumbnail(stream) {
            if(stream.pf.yt.exists && stream.pf.yt.id != '') {
                return `https://img.youtube.com/vi/${stream.pf.yt.id}/mqdefault.jpg`;
            } else if(stream.pf.yt.exists && stream.stream_host.id != 'outside') {
                return `/assets/thumb/youtube/${this.charaData[stream.stream_host.id]['2key']}_thrumb.jpg`;
            } else if(stream.pf.yt.exists && stream.stream_host.id == 'outside') {
                return "/assets/thumb/thumb.png";
            } else if(stream.pf.url.exists && stream.pf.url.li != '') {
                return `https://schedule-api.noripromatome.ml/client-api/getOpenGraph.php?url=${encodeURIComponent(stream.pf.url.li)}`;
            } else if(stream.pf.bl.exists) {
                return `/assets/thumb/bilibili/${this.charaData[stream.stream_host.id]['2key']}_thrumb.jpg`;
            }
            return "/assets/thumb/thumb.png";
        },
        isLive(stream) {
            return stream.pf.yt.isLive;
        }
    },
    components: { Truck, Bilibili, Youtube }
}
</script>

<style scoped>
.bi,
.mr-1 {
    margin-right: .25em;
}
.bi.bi-bilibili {
    color: var(--color-theme-bilibili);
}
.bi.bi-youtube {
    color: var(--color-theme-youtube);
}
</style>