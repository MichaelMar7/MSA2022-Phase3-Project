import React from "react"
import {QuoteGrid} from "../components/QuoteGrid";

export default {
    title: "Quote Grid",
    component: QuoteGrid,
};

const Template = (args:any) => <QuoteGrid {...args} />;

export const Default = Template.bind({});

export const Valid = Template.bind({});

export const DefaultSmall = Template.bind({});

export const ValidSmall = Template.bind({});


/*
export const Default = Template.bind({});
Default.args = {
    backgroundColor: ""
}

export const Valid = Template.bind({});
Valid.args = {
    backgroundColor: "White"
}

export const DefaultSmall = Template.bind({});
DefaultSmall.args = {
    backgroundColor: ""
}

export const ValidSmall = Template.bind({});
Valid.args = {
    backgroundColor: "White"
}
*/

