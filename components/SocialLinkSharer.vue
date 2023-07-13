<template>
  <section id="social-links-sharer" class="row">
    <p class="text">Share on:</p>

    <ul class="flex">
      <li>
        <a :href="getFacebookLink" target="_blank" class="social-share-button">
          <img :src="addBasePath('/icons/facebook-f.svg')" alt="" />
        </a>
      </li>

      <li>
        <a :href="getTwitterLink" target="_blank" class="social-share-button">
          <img :src="addBasePath('/icons/twitter-m.svg')" alt="" />
        </a>
      </li>

      <li>
        <a
          :href="getGooglePlusLink"
          target="_blank"
          class="social-share-button"
        >
          <img :src="addBasePath('/icons/mail.svg')" alt="" />
        </a>
      </li>

      <li>
        <a :href="getPinterestLink" target="_blank" class="social-share-button">
          <img :src="addBasePath('/icons/pinterest-m.svg')" alt="" />
        </a>
      </li>

      <li>
        <a :href="getLinkedinLink" target="_blank" class="social-share-button">
          <img :src="addBasePath('/icons/linkedin.svg')" alt="" />
        </a>
      </li>
    </ul>
  </section>
</template>

<script>
import { computed, useContext } from "@nuxtjs/composition-api";
import { addBasePath } from "@vue-storefront/core";

export default {
  name: "SocialLinkSharer",
  props: ["product"],
  setup(props, { root }) {
    const { $config } = useContext();
    const local = $config.baseURL;
    const getFacebookLink = computed(() => {
      console.log(local);
      let link = `https://www.facebook.com/sharer.php?u=${local}`;
      return link;
    });
    const getTwitterLink = computed(() => {
      let link = `https://twitter.com/share?
        url=${local}
        &text=${getPageTitle}
        &hashtags=copia-kenya
      `;
      return link;
    });
    const getGooglePlusLink = computed(() => {
      let link = `https://plus.google.com/share?url=${local}`;
      return link;
    });
    const getPinterestLink = computed(() => {
      let link = `https://pinterest.com/pin/create/bookmarklet/?
        media=${addBasePath(props.product.images[0].desktop.url)}
        &url=${local}
        &is_video=false
        &description=${getPageTitle}
      `;
      return link;
    });
    const getLinkedinLink = computed(() => {
      let link = `https://www.linkedin.com/shareArticle?
        url=${local}
        &title=${getPageTitle}
      `;
      return link;
    });
    const getPageTitle = computed(() => {
      if (root.$route.meta.title == undefined) return null;
      else return root.$route.meta.title;
    });

    const actual = root.$route.path;

    return {
      getFacebookLink,
      getTwitterLink,
      getGooglePlusLink,
      getPinterestLink,
      getLinkedinLink,
      getPageTitle,
      actual,
      addBasePath,
    };
  },
};
</script>

<style lang="css" scoped>
.social-share-button {
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #8d8f9a;
  border-radius: 100%;
  margin-right: 16px;
}

#social-links-sharer p {
  margin-bottom: 10px;
}

#social-links-sharer {
  border-top: solid 1px #e0e0e2;
  padding-top: 32px;
  margin-top: 64px;
}
</style>
