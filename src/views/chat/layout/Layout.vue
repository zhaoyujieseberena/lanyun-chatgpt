<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { NLayout, NLayoutContent, NInput, NButton } from "naive-ui";
import { useRouter } from "vue-router";
import Sider from "./sider/index.vue";
import Permission from "./Permission.vue";
import { useBasicLayout } from "@/hooks/useBasicLayout";
import { useAppStore, useAuthStore, useChatStore } from "@/store";
import { fetchGetUser } from "@/api";

const router = useRouter();
const appStore = useAppStore();
const chatStore = useChatStore();
const authStore = useAuthStore();
const prompt = ref<string>("");

router.replace({ name: "Chat", params: { uuid: chatStore.active } });

const { isMobile } = useBasicLayout();

const collapsed = computed(() => appStore.siderCollapsed);

// const needPermission = computed(() => (!authStore.token || authStore.times >= 4))
const needPermission = computed(() => {
	// return true
	// 有token
	if (authStore.token) return false;
	// 没有token，判断缓存是否大于4
	return parseInt(localStorage.getItem("accessAuth") || "") >= 4;
});

const getMobileClass = computed(() => {
	if (isMobile.value) return ["rounded-none", "shadow-none"];
	return ["border", "rounded-md", "shadow-md", "dark:border-neutral-800"];
});

const getContainerClass = computed(() => {
	return ["h-full", { "pl-[260px]": !isMobile.value && !collapsed.value }];
});

function handleSubmit() {
	onConversation();
}
async function onConversation() {}

onMounted(async () => {
	const userInfo = await fetchGetUser(authStore.token || "");
	if (userInfo.data === null) authStore.removeToken();
	if (!localStorage.getItem("accessAuth"))
		localStorage.setItem("accessAuth", "0");
});
</script>

<template>
	<div
		class="h-full dark:bg-[#24272e] transition-all m-auto"
		:class="[isMobile ? 'p-0' : 'p-4']"
	>
		<div class="w-full max-w-screen-xl m-auto">
			<div class="flex items-center justify-between space-x-2">
				<NLayoutHeader style="height: 10vh; width: 76vw">
					<div style="transform: translate(30%, 0%)">
						<Input
							v-model:value="prompt"
							type="text"
							placeholder="请输入卡密"
							width=""
						></Input>

						<NButton type="primary" @click="handleSubmit">提交</NButton>
						<NButton type="primary" @click="handleSubmit">获取卡密</NButton>

						剩余提问次数 : 0

						<NButton type="primary" @click="handleSubmit">查询</NButton>
						<NButton type="primary" @click="handleSubmit">联系管理员</NButton>
					</div>
				</NLayoutHeader>
			</div>
		</div>

		<div class="h-full overflow-hidden">
			<NLayout
				class="z-40 transition"
				:class="getContainerClass"
				has-sider
				style="height: 90vh; width: 95vw"
			>
				<Sider />

				<NLayoutContent class="h-full">
					<RouterView v-slot="{ Component, route }">
						<component :is="Component" :key="route.fullPath" />
					</RouterView>
				</NLayoutContent>
			</NLayout>
		</div>
		<Permission :visible="needPermission" />
	</div>
</template>
