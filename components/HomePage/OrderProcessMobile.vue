<template>
  <div>
    <SfHero class="smartphone-only hero-smartphone shop-step">
      <div class="li-div">
        <div class="icon-div">
          <img
            :src="'/homepage/busket.png'"
            alt
            width="30"
            id="free-delivery--image"
          />
        </div>
        <div class="description">
          <p class="block description-title">SHOP</p>
          <p class="description-content">
            Browse through goods and select what <br />you would like to send
          </p>
        </div>
      </div>
      <div class="flex li-div">
        <div class="icon-div">
          <img
            :src="'/homepage/location1.png'"
            alt
            width="30"
            id="free-delivery--image"
          />
        </div>
        <div class="description">
          <p class="block description-title">LOCATION</p>
          <p class="description-content">
            Let us know where you would like <br />
            your goods delivered
          </p>
        </div>
      </div>
      <div class="flex li-div">
        <div class="icon-div">
          <img
            :src="'/homepage/carbon_delivery.png'"
            alt
            width="30"
            id="free-delivery--image"
          />
        </div>
        <div class="description">
          <p class="block description-title">DELIVERY</p>
          <p class="description-content">
            Copia will deliver your goods to your <br />
            nearest delivery point in 2-4 days
          </p>
        </div>
      </div>
    </SfHero>
  </div>
</template>

<script>
import { SfIcon, SfHero } from '@storefront-ui/vue';

export default {
  name: 'OrderProcessMobile',
  components: {
    SfIcon,
    SfHero,
  },
  setup() {
    return {
      SfIcon,
      SfHero,
    };
  },
};
</script>
<style lang="scss" scoped>
.description-title {
  color: #1d1f22;
  font-size: 16px;
  font-family: 'Montserrat';
  font-weight: 700;
}
.description-content {
  font-family: 'Lato';
  font-size: 14px;
  color: #43464e;
}

.hero-smartphone {
  .li-div {
    padding: 10px 10px;
    align-items: center;
    width: 100%;
    display: flex;
    .icon-div {
      background: #fecb06;
      width: 64px;
      height: 64px;
      border-radius: 60%;
      margin-right: 16px;
      display: flex;
      justify-content: center;
      align-items: center;
      @include for-mobile {
        margin-right: 6px;
      }
      span {
        top: calc(50% - 13px);
      }
      svg {
        fill: #fd0019;
      }
    }
    .description {
      width: calc(100% - 64px);
    }
  }
}
.order-process-flow {
  ul {
    li {
      border: 1px solid #e0e0e1;
      box-sizing: border-box;
      padding: 25px 40px;
      p.icon {
        background: #fecb06;
        width: 64px;
        height: 64px;
        border-radius: 60%;
        margin-right: 16px;
        span {
          top: calc(50% - 13px);
        }
        svg {
          fill: #fd0019;
        }
      }
      p.description {
        width: calc(100% - 64px);
      }
    }
  }
}
</style>
<style lang="scss">
.shop-step {
  .sf-hero__bullets {
    .sf-bullets {
      .sf-button {
        background: #e0e0e1;
      }
      .is-active {
        background: #fecb06;
      }
    }

    @include for-mobile {
      display: block;
      bottom: -10px;
    }
  }
}
</style>
