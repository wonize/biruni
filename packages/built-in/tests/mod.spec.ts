import * as mod from '@/mod';
import { type MockData } from '@repo/mocks';

it('have re-export <EventPlugin>', () => {
	expect(mod.EventPlugin<MockData>).toBeDefined();
});

it('have re-export <event>', () => {
	expect(mod.event<MockData>).toBeDefined();
});

it('have re-export <JsonPlugin>', () => {
	expect(mod.JsonPlugin<MockData>).toBeDefined();
});

it('have re-export <json>', () => {
	expect(mod.json<MockData>).toBeDefined();
});

it('have re-export <LocalStoragePlugin>', () => {
	expect(mod.LocalStoragePlugin<MockData>).toBeDefined();
});

it('have re-export <localstorage>', () => {
	expect(mod.localstorage<MockData>).toBeDefined();
});

it('have re-export <HasAccessor>', () => {
	expect(mod.HasAccessor<MockData>).toBeDefined();
});

it('have re-export <hasOwn>', () => {
	expect(mod.hasOwn<MockData>).toBeDefined();
});

it('have re-export <GetAccessor>', () => {
	expect(mod.GetAccessor<MockData>).toBeDefined();
});

it('have re-export <getter>', () => {
	expect(mod.getter<MockData>).toBeDefined();
});

it('have re-export <SetAccessor>', () => {
	expect(mod.SetAccessor<MockData>).toBeDefined();
});

it('have re-export <setter>', () => {
	expect(mod.setter<MockData>).toBeDefined();
});

it('have re-export <PropertyAccessor>', () => {
	expect(mod.PropertyAccessor<MockData>).toBeDefined();
});

it('have re-export <accessorizer>', () => {
	expect(mod.accessorizer<MockData>).toBeDefined();
});

it('have re-export <StarterPack>', () => {
	expect(mod.StarterPack<MockData>).toBeDefined();
});

it('have re-export <starter>', () => {
	expect(mod.starter<MockData>).toBeDefined();
});

it('have re-export <starter> as <default>', () => {
	expect(mod.default<MockData>).toBeDefined();
	expect(mod.default<MockData>).toBe(mod.starter<MockData>);
});
