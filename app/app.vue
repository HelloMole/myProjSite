<template>
  <a-config-provider :theme="{ algorithm: isDarkMode ? theme.darkAlgorithm : theme.defaultAlgorithm}">
    <div>
      <NuxtRouteAnnouncer />
        <NuxtPage />
    </div>
  </a-config-provider>
</template>

<script lang="ts" setup>
  import { theme } from 'ant-design-vue';
  import { useThemeStore } from '../stores/theme';
  
  const themeStore = useThemeStore();
  
  onMounted(() => {
    themeStore.initDarkMode();
  });
  
  const isDarkMode = computed(() => themeStore.isDarkMode);
</script>