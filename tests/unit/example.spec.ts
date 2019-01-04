import {shallowMount} from '@vue/test-utils';
import HomeLayout from '@/viewcomponents/home/HomeLayout.vue';

describe('HomeLayout.vue', () => {
    it('renders props.msg when passed', () => {
        const msg = 'new message';
        const wrapper = shallowMount(HomeLayout, {
            propsData: {msg},
        });
        expect(wrapper.text()).toMatch(msg);
    });
});
