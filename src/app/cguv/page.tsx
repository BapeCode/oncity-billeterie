import Footer from "@/components/layout/Footer";
import Navigation from "@/components/layout/Navigation";

export default function Page() {
  return (
    <main className="flex flex-col items-center justify-start h-screen w-full">
      <Navigation />
      <div className="flex flex-col items-start max-w-4xl p-6 mx-auto">
        <span className="text-3xl font-bold text-black mb-5 w-full text-center">
          Conditions Générales d'Utilisation et de Vente
        </span>

        <div className="flex flex-col items-start gap-2 mt-5">
          <h1 className="text-3xl font-bold text-primary text-left">
            1. Objet
          </h1>

          <span className="text-left text-md wrap-break-word">
            Les présentes Conditions Générales régissent la vente de billets et
            l’accès à l’événement organisé par{" "}
            <strong>Lyon 6ème & OnCity</strong>, ci-après « l’Organisateur ».
            Toute commande implique l’acceptation sans réserve des présentes
            conditions.
          </span>
        </div>

        <div className="flex flex-col items-start gap-2 mt-5">
          <h1 className="text-3xl font-bold text-primary text-left">
            2. Accès à l'événement
          </h1>

          <span className="text-left text-md wrap-break-word">
            L&#39;événement est{" "}
            <strong>strictement interdit aux mineurs (moins de 18 ans)</strong>.
            Une pièce d&#39;identité valide pourra être exigée à l&#39;entrée.
            L&#39;accès à l&#39;événement est soumis à la présentation d&#39;un
            billet nominatif et d&#39;un <strong>QR code valide</strong>. Ce
            billet est personnel, non échangeable et non remboursable. Une{" "}
            <strong>tenue blanche est exigée</strong>. L&#39;accès pourra
            être refusé à toute personne ne respectant pas le dress code, ou une
            majoration de <strong>60,00€</strong> pourra être demandée.
          </span>
        </div>

        <div className="flex flex-col items-start gap-2 mt-5">
          <h1 className="text-3xl font-bold text-primary text-left">
            3. Sécurité et comportement
          </h1>

          <span className="text-left text-md wrap-break-word">
            <strong>
              Toute personne en état d&#39;ébriété manifeste pourra se voir
              refuser l&#39;accès ou être expulsée
            </strong>{" "}
            de l&#39;événement sans possibilité de remboursement.
            <strong>
              L'introduction de substances illicites, d'armes, ou d'objects
              dangereux est formellement interdite
            </strong>
            . L'Organisateur se réserve le droit de refuser l'entrée ou
            d'expulser toute personne ayant un comportement jugé inapproprié,
            agressif ou dangereux.
          </span>
        </div>

        <div className="flex flex-col items-start gap-2 mt-5">
          <h1 className="text-3xl font-bold text-primary text-left">
            4. Prévention de l'alcoolisme
          </h1>

          <span className="text-left text-md wrap-break-word">
            La vente et la consommation d'alcool seront{" "}
            <strong>strictement réservées aux personnes majeures</strong>, dans
            le respect de la réglementation en vigueur. L'Organisateur rappelle
            que <strong>l'abus d'alcool est dangereux pour la santé</strong> et
            encourage une consommation responsable. Des mesures de prévention
            pourront être mises en place (distribution d'eau gratuite, personnel
            sensibilisé, affichage informatif...). L&#39;introduction de
            substances illicites, d&#39;armes ou d&#39;objets dangereux est
            formellement interdite. L&#39;Organisateur se réserve le droit de
            refuser l&#39;entrée ou d&#39;expulser toute personne ayant un
            comportement jugé inapproprié, agressif ou dangereux.
          </span>
        </div>

        <div className="flex flex-col items-start gap-2 mt-5">
          <h1 className="text-3xl font-bold text-primary text-left">
            5. Transport & retour sécurisé
          </h1>

          <span className="text-left text-md wrap-break-word">
            L&#39;Organisateur{" "}
            <strong>
              encourage fortement l&#39;usage des transports en commun
            </strong>
            , des VTC, ou du covoiturage afin de garantir la sécurité de tous
            les participants.{" "}
            <strong>
              Il est formellement déconseillé de reprendre le volant après avoir
              consommé de l&#39;alcool.{" "}
            </strong>
          </span>
        </div>

        <div className="flex flex-col items-start gap-2 mt-5">
          <h1 className="text-3xl font-bold text-primary text-left">
            6. Droit à l'image
          </h1>

          <span className="text-left text-md wrap-break-word">
            En accédant à l&#39;événement, vous acceptez que votre image puisse
            être captée à des fins de communication (photo/vidéo), sauf
            opposition explicite.
          </span>
        </div>

        <div className="flex flex-col items-start gap-2 mt-5">
          <h1 className="text-3xl font-bold text-primary text-left">
            7. Données personnelles
          </h1>

          <span className="text-left text-md wrap-break-word">
            Les informations collectées sont utilisées uniquement dans le cadre
            de la gestion de l'événement (billeterie, sécurité, information).
            Elles ne seront ni vendues, ni partagées à des tiers non autorisés.
            Vous disposez d'un droit d'accès, de rectification et de suppression
            de vos données.
          </span>
        </div>

        <div className="flex flex-col items-start gap-2 mt-5">
          <h1 className="text-3xl font-bold text-primary text-left">
            8.Responsabilité
          </h1>

          <span className="text-left text-md wrap-break-word">
            L&#39;Organisateur ne saurait être tenu responsable en
            <strong> cas de perte, vol ou dégradation</strong> d&#39;effets
            personnels. En <strong>cas de non-respect des règles</strong> par un
            participant. Pour tout incident survenant en dehors du périmètre de
            l&#39;événement.
          </span>
        </div>

        <div className="flex flex-col items-start gap-2 mt-5">
          <h1 className="text-3xl font-bold text-primary text-left">
            9.Modification ou annulation
          </h1>

          <span className="text-left text-md wrap-break-word">
            En cas de modification majeure ou d&#39;annulation indépendante de
            la volonté de l&#39;Organisateur (force majeure, mesure
            sanitaire...), les billets ne pourront être remboursés que selon les
            conditions définies.
          </span>
        </div>
      </div>
      <Footer />
    </main>
  );
}
