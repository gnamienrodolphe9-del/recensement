 document.addEventListener("DOMContentLoaded", () =>{
 const supabaseUrl = "https://zraazugglrvsouknclgk.supabase.co";
        const supabaseKey = "sb_publishable_bV08KACDXYYHFdVrGXiVHw_i0T_Bh7c";

        const supabaseClient = supabase.createClient(supabaseUrl, supabaseKey);

        document.getElementById("form").addEventListener("submit", async (e) => {
            e.preventDefault();

            const nom = document.getElementById("nom").value;
            const prenom = document.getElementById("prenom").value;
            const numero = document.getElementById("numero").value;
            const email = document.getElementById("email").value;
            const habitation = document.getElementById("habitation").value;
            const date = document.getElementById("date").value;
            const idees = document.getElementById("idees").value;
            const file = document.getElementById("photos").files[0];

            let photo_url = "";

            // 📸 Upload image
            if (file) {
                const fileName = Date.now() + "_" + file.name;

                const { data: uploadData, error: uploadError } = await supabaseClient
                    .storage
                    .from("photos")
                    .upload(fileName, file);

                if (uploadError) {
                    alert("Erreur upload image");
                    return;
                }

                const { data: publicUrlData } = supabaseClient
                    .storage
                    .from("photos")
                    .getPublicUrl(fileName);

                photo_url = publicUrlData.publicUrl;
            }

            // 📥 Envoi données
            const { error } = await supabaseClient
                .from("utilisateurs")
                .insert([{
                    nom,
                    prenom,
                    numero,
                    email,
                    habitation,
                    date,
                    idees,
                    photo_url
                }]);

            if (error) {
                console.log(error);
                alert("Erreur : " + error.message);
            } else {
                alert("Enregistré avec succès !");
                document.getElementById("form").reset();
            }
        });
    });