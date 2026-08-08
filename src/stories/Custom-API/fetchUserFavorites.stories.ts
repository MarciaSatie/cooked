import { createElement } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { FetchUserFavoritesTester } from "./fetchUserFavorites";

// Fake Storybook response so the story can preview data without calling Supabase.
const mockFetchUserFavorites = async () => [
  {
    idMeal: "52772",
    strMeal: "Teriyaki Chicken Casserole",
    user_id: "f75fcf5b-10b2-4051-bc1c-30b274653ed8",
  },
];



const meta: Meta<typeof FetchUserFavoritesTester> = {
  title: "Custom-API/fetchUserFavorites",
  component: FetchUserFavoritesTester,
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof FetchUserFavoritesTester>;

export const Default: Story = {
  name: "Fetch User Favorites",
  // Storybook renders the tester component and injects the mock helper here.
  render: () =>
    createElement(FetchUserFavoritesTester, {
      fetchFavorites: mockFetchUserFavorites,
    }),
};