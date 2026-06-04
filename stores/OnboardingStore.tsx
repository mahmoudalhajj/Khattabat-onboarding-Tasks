import {action, makeObservable, observable,runInAction} from 'mobx';

export class OnboardingStore{

    loading = observable.box(false);
    selectedId = observable.box<number | null>(null);
    searchText= observable.box('');
    itemsById=observable.map<number, string>();


    setLoading(loading: boolean) {
        runInAction(()=>{
        this.loading.set(loading);
        }
    )}
    
    setSelectedId(id: number){
        runInAction(()=>{
        this.selectedId.set(id);
        }
        )}
    setSearchText= (text: string)=>{
          runInAction(()=>{
        this.searchText.set(text);
    }
    )}

    isLoading() {
        return this.loading.get();
    }
    getSelectedId() {
        return this.selectedId.get();
    }
    getSearchText() {
        return this.searchText.get();
    }

    async updateItems() {
        this.setLoading(true);
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
            this.setLoading(false);
        }
        

    }


