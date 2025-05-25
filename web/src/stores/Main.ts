import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { isEnvBrowser } from "../utils/misc";
import { AppearanceSettings, CustomizationConfig, Display, UpperBody, PedAppearance, Stock, PedHeadOverlays, PedHeadOverlayValue } from "@/utils/interfaces";
import { Admin, Basket, Category, ComponentList, JobOutfit, Jobs, MyOutfit, ShopOutfit } from "@/utils/types";
import { MockCategories } from "@/mocks/categories";
import { MockBasket } from "@/mocks/basket";
import { MockMyOutfits, MockShopOutfits } from "@/mocks/outfits";
import Nui from "@/Nui";
import { MockComponentList } from "@/mocks/componentList";

export interface MainType {
    display: Display;
    appearanceSettings: AppearanceSettings;
    storedData: PedAppearance;
    currentData: PedAppearance;
    config: CustomizationConfig;
    stock?: Stock;
    upperBody: UpperBody[];
    categories: Category[];
    basket: Basket[];
    myOutfits: MyOutfit[];
    shopOutfits: ShopOutfit[]
    jobOutfits: JobOutfit[];
    componentList: ComponentList;
    loading: boolean;
    admin: Admin
    jobs: Jobs[];
    isAdmin: boolean;
}

const Main = createSlice({
    name: "Static",
    initialState: {
        display: {
            appearance: isEnvBrowser()
        },
        storedData: {},
        currentData: {},
        config: {},
        stock: {},
        categories: isEnvBrowser() ? MockCategories : [],
        basket: isEnvBrowser() ? MockBasket : [],
        myOutfits: isEnvBrowser() ? MockMyOutfits : [],
        shopOutfits: isEnvBrowser() ? MockShopOutfits : [],
        componentList: isEnvBrowser() ? MockComponentList : [],
        loading: false,
        admin: {
            stock: false,
            arms: false,
            job_outfit: false
        },
        isAdmin: false,
    } as MainType,
    reducers: {
        setDisplay: (state, action: PayloadAction<Display>) => {
            state.display = action.payload;
        },
        setAppearanceSettings: (state, action: PayloadAction<AppearanceSettings>) => {
            state.appearanceSettings = action.payload;
        },
        addToAppearanceSettings: (state, action: PayloadAction<{ key: keyof AppearanceSettings, value: any }>) => {
            state.appearanceSettings = { ...state.appearanceSettings, [action.payload.key]: action.payload.value };
        },
        setStoredData: (state, action: PayloadAction<PedAppearance>) => {
            state.storedData = action.payload;
        },
        setCurrentData: (state, action: PayloadAction<PedAppearance>) => {
            state.currentData = action.payload;
        },
        updateCurrentData: (state, action: PayloadAction<{ key: keyof PedAppearance, value: any }>) => {
            if (!state.currentData) return;
            const updatedData = { ...state.currentData, [action.payload.key]: action.payload.value };
            state.currentData = updatedData;
        },
        setConfig: (state, action: PayloadAction<CustomizationConfig>) => {
            state.config = action.payload;
        },
        addToStock: (state, action: PayloadAction<{ key: keyof Stock, value: string | number }>) => {
            if (!state.stock) state.stock = {};
            if (!state.stock[action.payload.key]) state.stock[action.payload.key] = [];
            if (state.stock[action.payload.key]?.includes(action.payload.value)) return;
            state.stock[action.payload.key]?.push(action.payload.value);
        },
        removeFromStock: (state, action: PayloadAction<{ key: keyof Stock, value: string | number }>) => {
            if (!state.stock) state.stock = {};
            state.stock[action.payload.key] = state.stock[action.payload.key]?.filter((item: string | number) => item !== action.payload.value);
        },
        setStock: (state, action: PayloadAction<Stock>) => {
            state.stock = action.payload;
        },
        updateUpperBody: (state, action: PayloadAction<{ torso: number, upperBody: number }>) => {
            if (!state.upperBody) state.upperBody = [];
            if (state.upperBody.find((item) => item.torso === action.payload.torso)) {
                state.upperBody = state.upperBody.filter((item) => item.torso !== action.payload.torso);
            }
            state.upperBody.push({
                torso: action.payload.torso,
                upperBody: action.payload.upperBody
            })
        },
        setUpperBody: (state, action: PayloadAction<UpperBody[]>) => {
            state.upperBody = action.payload;
        },
        setCategories: (state, action: PayloadAction<any[]>) => {
            state.categories = action.payload;
        },
        setBasket: (state, action: PayloadAction<Basket[]>) => {
            state.basket = action.payload;
        },
        addToBasket: (state, action: PayloadAction<Basket>) => {
            const basketData = state.basket.find((item) => item.id === action.payload.id);
            if (basketData) {
                basketData.name = action.payload.name;
                basketData.price = action.payload.price;
                basketData.image = action.payload.image;
                basketData.type = action.payload.type;
                basketData.data = action.payload.data;
                return;
            }
            state.basket.push(action.payload);
        },
        removeFromBasket: (state, action: PayloadAction<Basket>) => {
            state.basket = state.basket.filter((item) => item.id !== action.payload.id);
        },
        setComponentList: (state, action: PayloadAction<ComponentList>) => {
            state.componentList = action.payload;
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        setMyOutfits: (state, action: PayloadAction<MyOutfit[]>) => {
            state.myOutfits = action.payload;
        },
        setAdmin: (state, action: PayloadAction<Admin>) => {
            state.admin = action.payload;
        },
        setJobs: (state, action: PayloadAction<Jobs[]>) => {
            state.jobs = action.payload;
        },
        setJobOutfits: (state, action: PayloadAction<JobOutfit[]>) => {
            state.jobOutfits = action.payload;
        },
        setIsAdmin: (state, action: PayloadAction<boolean>) => {
            state.isAdmin = action.payload;
        },

        changeHeadOverlay: (state, action: PayloadAction<{ key: keyof PedHeadOverlays, option: keyof PedHeadOverlayValue, value: number }>) => {
            if (!state.currentData) return;

            const updatedValue = { ...state.currentData.headOverlays[action.payload.key], [action.payload.option]: action.payload.value };

            const updatedData = { ...state.currentData, headOverlays: { ...state.currentData.headOverlays, [action.payload.key]: updatedValue } };

            state.currentData = updatedData;

            Nui.post('appearance_change_head_overlay', { ...state.currentData.headOverlays, [action.payload.key]: updatedValue });
        }
    }
})

export const {
    setDisplay,
    setAppearanceSettings,
    addToAppearanceSettings,
    setStoredData,
    setCurrentData,
    setConfig,
    addToStock,
    removeFromStock,
    setStock,
    updateUpperBody,
    setUpperBody,
    setCategories,
    setBasket,
    addToBasket,
    removeFromBasket,
    changeHeadOverlay,
    setComponentList,
    setLoading,
    updateCurrentData,
    setMyOutfits,
    setAdmin,
    setJobs,
    setJobOutfits,
    setIsAdmin
} = Main.actions

export default Main.reducer