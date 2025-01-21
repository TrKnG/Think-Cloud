<template>
  <div class="about-us">
    <div class="about-us__content" v-for="(paragraph, index) in paragraphs" :key="index" ref="contentRefs">
      <p>{{ paragraph }}</p>
    </div>
  </div>
</template>

<script>
import gsap from "gsap";

export default {
  data() {
    return {
      paragraphs: [
        "Lorem Ipsum 'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...' 'There is no one who loves pain itself, who seeks after it and wants to have it, simply because it is pain...'",
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus at ipsum id odio porta faucibus in tristique augue. Suspendisse nec odio quis leo posuere ornare.",
        "Vestibulum interdum tellus eget hendrerit gravida. Donec tempor purus ut euismod eleifend. Aliquam non arcu ultricies felis cursus bibendum eget quis odio.",
        "Nulla vitae neque lacus. Pellentesque at quam dignissim, finibus leo quis, elementum quam. Nulla dapibus ut eros a lobortis.",
        "Donec ipsum justo, tincidunt ullamcorper elit vitae, tincidunt porttitor tortor. Phasellus mollis risus nec lorem hendrerit imperdiet.",
      ],
    };
  },
  mounted() {
    this.animateContent();
  },
  methods: {
    animateContent() {
      gsap.from(".about-us__content", {
        duration: 1.5,
        y: 50,
        opacity: 0,
        stagger: 0.3,
        ease: "power4.out",
        onStart: () => console.log("Animation Started"),
        onComplete: () => console.log("Animation Completed"),
      });
    },
  },
};
</script>

<style>
</style>
