type HTMLWithClick = HTMLElement & {
  clickOutsideEvent: (event: Event) => void;
};

type BindingType = {
  value(): void;
};

export const clickOutside = {
  mounted: (el: HTMLWithClick, binding: BindingType) => {
    el.clickOutsideEvent = (event: Event) => {
      const target = event.target as Node;

      if (!(el === target || el.contains(target))) {
        binding.value();
      }
    };
    document.addEventListener("click", el.clickOutsideEvent);
  },
  unmounted: (el: HTMLWithClick) => {
    document.removeEventListener("click", el.clickOutsideEvent);
  },
};
