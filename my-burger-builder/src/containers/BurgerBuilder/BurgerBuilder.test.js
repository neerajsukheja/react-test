import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { BurgerBuilder } from './BurgerBuilder';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

configure({
    adapter: new Adapter()
})

describe('<BurgerBuilder />', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<BurgerBuilder onInitIngredients={() => { }} />);
    })

    it('should render 1 <BuildControls> if passed with ings props', () => {
        wrapper.setProps({
            ings: { salad: 0 },
        });
        expect(wrapper.find(BuildControls)).toHaveLength(1);
    });

    it('should render 0 <BuildControls> if passed with null ings props', () => {
        wrapper.setProps({
            ings: null,
        });
        expect(wrapper.find(BuildControls)).toHaveLength(0);
    });
});
