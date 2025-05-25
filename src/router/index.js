import { createRouter, createWebHistory } from "vue-router";
import Patients from "@/components/PatientsList/Patients.vue";
import AddNewPatient from "@/components/PatientsList/AddNewPatient.vue";
import AboutPatient from "@/components/PatientInfo/AboutPatient.vue";
import LoginForm from "@/components/LoginForm.vue";
import PatientPointDetails from "@/components/PatientInfo/PatientPointDetails.vue";
import AddNewPoint from "@/components/PatientInfo/AddNewPoint.vue";
import Diseases from "@/components/DiseaseInfo/Diseases.vue";
import ResearchTemplates from "@/components/ResearchTemplates/ResearchTemplates.vue"
import ResearchDetails from "@/components/ResearchTemplates/ResearchDetails.vue";
import AddResearchTemplate from "@/components/ResearchTemplates/AddResearchTemplate.vue";
import NewMetrics from "@/components/Metrics/NewMetrics.vue";
import Drugs from "@/components/DrugsInfo/Drugs.vue";
import AddDrugs from "@/components/DrugsInfo/AddDrugs.vue";
import AboutResearch from "@/components/Researchs/AboutResearch.vue";
import AddResearchValues from "@/components/Researchs/AddResearchValues.vue";
import AddResearch from "@/components/Researchs/AddResearch.vue";
import AddTreatmentDrug from "@/components/TreatmentDrug/AddTreatmentDrug.vue";
import Units from "@/components/Units/Units.vue";
import ResearchList from "@/components/AllResearchs/ResearchList.vue";
import AddSurgicalOperation from "@/components/SurgicalOperationInfo/AddSurgicalOperation.vue";
import AboutProject from "@/components/AboutProject.vue";
import ActiveIngredients from "@/components/ActiveIngredients/ActiveIngredients.vue";
import PharmacologicalGroup from "@/components/PharmacologicalGroup/PharmacologicalGroup.vue";


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "about",
      component: AboutProject,
    },
    {
      path: "/login",
      name: "login",
      component: LoginForm,
    },
    {
      path: "/patientslist",
      name: "patientslist",
      component: Patients,
    },
    {
      path: "/patientslist/:id",
      name: "patient",
      component: AboutPatient,
      props: true,
    },
    {
      path: "/pointdetails/:id",
      name: "pointdetails",
      component: PatientPointDetails,
      props: true,
    },
    {
      path: "/newpoint/:patient_id",
      name: "newpoint",
      component: AddNewPoint,
      props: true,
    },
    {
      path: "/newpatient",
      name: "newpatient",
      component: AddNewPatient,
    },
    {
      path: "/diseaseslist",
      name: "diseaseslist",
      component: Diseases,
    },
    {
      path: "/unitslist",
      name: "unitslist",
      component: Units,
    },
    {
      path: "/researchtemplates",
      name: "researchtemplates",
      component: ResearchTemplates,
    },
    {
      path: "/researchtemplates/:id",
      name: "researchtemplatedetail",
      component: ResearchDetails,
      props: true,
    },
    {
      path: "/newresearchtemplate",
      name: "newresearchtemplate",
      component: AddResearchTemplate,
    },
    {
      path: "/newmetrics/:id",
      name: "newmetrics",
      component: NewMetrics,
      props: true,
    },
    {
      path: "/drugslist",
      name: "drugslist",
      component: Drugs,
    },
    {
      path: "/newdrug",
      name: "newdrug",
      component: AddDrugs,
    },
    {
      path: "/aboutresearch/:research_id",
      name: "aboutresearch",
      component: AboutResearch,
      props: true,
    },
    {
      path: "/addresearchvalues/:research_id",
      name: "addresearchvalues",
      component: AddResearchValues,
      props: true,
    },
    {
      path: "/newresearch/:point_id",
      name:"newresearch",
      component: AddResearch,
      props: true,
    },
    {
      path: "/newtreatmentdrug/:point_id",
      name:"newtreatmentdrug",
      component: AddTreatmentDrug,
      props: true,
    },
    {
      path: "/researchlist",
      name: "researchlist",
      component: ResearchList,
    },
    {
      path: "/newsurgicaloperation/:point_id",
      name:"newsurgicaloperation",
      component: AddSurgicalOperation,
      props: true,
    },
    {
      path: "/activeingredients",
      name: "activeingredients",
      component: ActiveIngredients,
    },
    {
      path: "/pharmacologicalgroups",
      name: "pharmacologicalgroups",
      component: PharmacologicalGroup,
    },

  ],
});

export default router;
