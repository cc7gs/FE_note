import { Set } from '../../basic/set'

describe('Set', () => {
    let set: Set<number>;

    beforeEach(() => {
        set = new Set<number>();
    });

    it('start empty', () => {
        expect(set.size()).toEqual(0);
        expect(set.isEmpty()).toEqual(true)
    });

    it('add elements', () => {
        for (let i = 1; i < 5; i++) {
            set.add(i);
            expect(set.size()).toEqual(i)
        }
        expect(set.isEmpty()).toEqual(false)
    })

    it('does not allow duplicated elements', () => {
        let expected = true;
        for (let i = 1; i < 5; i++) {
            expect(set.add(i)).toEqual(expected)
        }
        expected = false;
        for (let i = 1; i < 5; i++) {
            expect(set.add(i)).toEqual(expected)
        }
    });

    it('deletes elements', () => {
        for (let i = 1; i < 5; i++) {
            set.add(i);
        }
        for (let i = 1; i < 5; i++) {
            expect(set.delete(i)).toEqual(true)
        }
        for (let i = 1; i < 5; i++) {
            expect(set.delete(i)).toEqual(false)
        }
        expect(set.isEmpty()).toEqual(true)
    });

    it('returns if it is empty', () => {
        expect(set.isEmpty()).toEqual(true);
        for (let i = 1; i < 5; i++) {
            set.add(i)
            expect(set.isEmpty()).toEqual(false)
        }
        for (let i = 1; i < 5; i++) {
            set.delete(i);
            expect(set.isEmpty()).toEqual(!(i < 4))
        }
        expect(set.size()).toEqual(0);
        expect(set.isEmpty()).toEqual(true)
    });

    it('clears the set', () => {
        set.clear();
        expect(set.isEmpty()).toEqual(true);

        set.add(1);
        set.add(2);

        set.clear();
        expect(set.isEmpty()).toEqual(true);
    });

    it('returns toString primitive types:string', () => {
        const ds = new Set<string>();
        ds.add('el1');
        expect(ds.toString()).toEqual('el1')
        ds.add('el2');
        expect(ds.toString()).toEqual('el1,el2')
    });

    it('returns toString objects', () => {
        class MyObj {
            constructor(public el: any, public el2: any) { }
            toString() {
                return `${this.el.toString()}|${this.el2.toString()}`;
            }
        }
        const ds = new Set<MyObj>();
        ds.add(new MyObj(1, 2));
        expect(ds.toString()).toEqual('1|2');

        ds.add(new MyObj(3, 4));
        expect(ds.toString()).toEqual('1|2,3|4');
    });
})