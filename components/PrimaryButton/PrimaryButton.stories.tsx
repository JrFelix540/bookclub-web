import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { PrimaryButton as ButtonComponent } from "./PrimaryButton";

export default {
  title: "Design System/Atoms/PrimaryButton",
  component: ButtonComponent,
  args: {},
} as ComponentMeta<typeof ButtonComponent>;

const Template: ComponentStory<typeof ButtonComponent> = (args) => (
  <ButtonComponent {...args} />
);

export const PrimaryButton = Template.bind({});
PrimaryButton.args = {
  backgroundColor: "#0f3057",
  color: "#fff",
  height: "50px",
  width: "250px",
  borderRadius: "sm",
  variant: "solid",
};

export const SecondaryButton = Template.bind({});
SecondaryButton.args = {
  color: "#0f3057",
  backgroundColor: "#fff",
  height: "50px",
  width: "250px",
  borderRadius: "sm",
  variant: "solid",
};
