import {action, makeObservable, observable,runInAction} from 'mobx';

export class OnboardingStore{

    loading = observable.box(false);
    selectedId = observable.box<number | null>(null);
    searchText= observable.box('');
    itemsById=observable.map<number, string>();


    set setLoading(loading: boolean) {
        this.loading.set(loading);
    }
    set setSelectedId(id: number){
        this.selectedId.set(id);
    }
    set setSearchText(text: string){
        this.searchText.set(text);
    }

    get isLoading() {
        return this.loading.get();
    }
    get getSelectedId() {
        return this.selectedId.get();
    }
    get getSearchText() {
        return this.searchText.get();
    }

    async updateItems() {
        this.setLoading = true;
    try{
         const data =
            await Promise.resolve([
                { id: 1, name: "Item1" },
                { id: 2, name: "Item2" }
            ]);

        runInAction(() => {
            data.forEach(item => { 
                this.itemsById.set(item.id, item.name) });
            });

        }catch(error){
            runInAction(() => {
            console.error("Failed to fetch items", error);
            });
        }
            this.setLoading = false;
        }

    }


