const API = "http://localhost:8080";

type Produit = {
  name: string;
  quantite: string;
};

async function addProd(): Promise<void> {
    const name = (document.getElementById("add-name") as HTMLInputElement).value.trim();
    const quantite = (document.getElementById("add-qty") as HTMLInputElement).value.trim();
    const toast = document.getElementById("toast-add");

    if(!name || !quantite) {
        toast.textContent="Remplis les 2 champs";
        return;
    }
}

