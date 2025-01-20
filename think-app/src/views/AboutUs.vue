<template>
  <div class="about-us">
    <div class="content" v-for="(paragraph, index) in paragraphs" :key="index">
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
      gsap.from(".content", {
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

<style scoped>
.about-us {
  max-width: 900px;
  margin: 0 auto;
  padding: 50px 20px;
  font-family: "Arial", sans-serif;
  background-color: #f4f4f9;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.content {
  margin-bottom: 20px;
  font-size: 16px;
  line-height: 1.8;
  color: #333;
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  opacity: 1;
  transform: translateY(0);
}

.content p {
  margin: 0;
  color: #555;
}

.content:last-child {
  margin-bottom: 0;
}
</style>
