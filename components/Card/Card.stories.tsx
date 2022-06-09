import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Card as CardComponent } from "./Card";

export default {
  title: "Design System/Atoms/Input",
  component: CardComponent,
  args: {},
} as ComponentMeta<typeof CardComponent>;

const Template: ComponentStory<typeof CardComponent> = (args) => (
  <CardComponent {...args}>boom</CardComponent>
);

export const Card: typeof Template = Template.bind({});
Card.args = {
  h: "200px",
  width: "200px",
};
