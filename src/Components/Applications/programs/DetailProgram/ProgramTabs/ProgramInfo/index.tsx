import React from 'react';
import {TabPane, UncontrolledAccordion} from 'reactstrap';
import {Calendar, FileText, Home, Layers, Tag, User, Users} from 'react-feather';
import ProgramInfoAccordionItem from '@/Components/Applications/programs/DetailProgram/ProgramTabs/ProgramInfo/ProgramInfoAccordionItem';
import {useAppSelector} from "@/Redux/Hooks";
import {calculateDuration} from "@/utils";

const ProgramInfo = () => {

    const {programData} = useAppSelector(state=>state.programs);

    return (
        <TabPane tabId="1">
            <div className="row gap-4">
                <div className="col-12">
                    <div className="basic-accordion">
                        <div className="mx-5 mt-5 accordion-border icons-accordion">
                            <UncontrolledAccordion className="me-5 mb-5" toggle={()=>{}}>
                                <ProgramInfoAccordionItem
                                    id="1"
                                    Icon={<Tag className="svg-wrapper text-success" />}
                                    title="Nom du programme"
                                >
                                    <div className="program-info text-success">
                                        <div className="info-row">
                                            <span className="value">
                                                {programData?.name || "Nom non spécifié"}
                                            </span>
                                        </div>
                                    </div>
                                </ProgramInfoAccordionItem>

                                <ProgramInfoAccordionItem
                                    id="2"
                                    Icon={<FileText className="svg-wrapper text-success" />}
                                    title="Description du programme"
                                >
                                    <div className="program-info text-success">
                                        <div className="info-row">
                                            <span className="value">
                                                {programData?.description || "Description non spécifiée"}
                                            </span>
                                        </div>
                                    </div>
                                </ProgramInfoAccordionItem>

                                <ProgramInfoAccordionItem
                                    id="3"
                                    Icon={<Calendar className="svg-wrapper text-success" />}
                                    title="Durée du programme"
                                >
                                    <div className="program-duration text-success">
                                        <div className="date-info">
                                            <span className="label">Lancement :</span>
                                            <span className="value">
                                                {programData?.started_at || "Non spécifié"}
                                            </span>
                                        </div>
                                        <div className="date-info">
                                            <span className="label">Fin :</span>
                                            <span className="value">
                                                {programData?.ended_at || "Non spécifié"}
                                            </span>
                                        </div>
                                        <div className="duration-info">
                                            <span className="label">Durée :</span>
                                            <span className="value">
                                                {programData?.started_at && programData?.ended_at
                                                    ? calculateDuration(programData.started_at, programData.ended_at)
                                                    : "Non spécifiée"}
                                            </span>
                                        </div>
                                    </div>
                                </ProgramInfoAccordionItem>

                                <ProgramInfoAccordionItem
                                    id="4"
                                    Icon={<User className="svg-wrapper text-success" />}
                                    title="Audience ciblée"
                                >
                                    <div className="program-info text-success">
                                        <div className="info-row">
                                            <span className="value">
                                                {programData?.targeted_audience || "Audience non spécifiée"}
                                            </span>
                                        </div>
                                    </div>
                                </ProgramInfoAccordionItem>

                                <ProgramInfoAccordionItem
                                    id="5"
                                    Icon={<Layers className="svg-wrapper text-success" />}
                                    title="Type de programme"
                                >
                                    <div className="program-info text-success">
                                        {programData?.types && programData.types.length > 0 ? (
                                            programData.types.map((type: any) => (
                                                <div className="info-row" key={type.id}>
                                                    <span className="value">{type.name}</span>
                                                </div>
                                            ))
                                        ) : (
                                            <div className="info-row">
                                                <span className="value">Type non spécifié</span>
                                            </div>
                                        )}
                                    </div>
                                </ProgramInfoAccordionItem>

                                <ProgramInfoAccordionItem
                                    id="6"
                                    Icon={<Home className="svg-wrapper text-success" />}
                                    title="Catégorie de programme"
                                >
                                    <div className="program-info text-success">
                                        {programData?.categories && programData.categories.length > 0 ? (
                                            programData.categories.map((category: any) => (
                                                <div className="info-row" key={category.id}>
                                                    <span className="value">{category.name}</span>
                                                </div>
                                            ))
                                        ) : (
                                            <div className="info-row">
                                                <span className="value">Catégorie non spécifiée</span>
                                            </div>
                                        )}
                                    </div>
                                </ProgramInfoAccordionItem>
                                <ProgramInfoAccordionItem
                                    id="7"
                                    Icon={<Users className="svg-wrapper text-success" />}
                                    title="Partenaires"
                                >
                                    <div className="program-info text-success">
                                        {programData?.partners && programData.partners.length > 0 ? (
                                            programData.partners.map((partner: any) => (
                                                <div className="partner-info mb-4" key={partner.id}>
                                                    <div className="info-row">
                                                        <strong>Nom :</strong> <span className="value">{partner.name || "Non spécifié"}</span>
                                                    </div>
                                                    <div className="info-row">
                                                        <strong>Description :</strong> <span className="value">{partner.description || "Non spécifiée"}</span>
                                                    </div>
                                                    <div className="info-row">
                                                        <strong>Site web :</strong>{" "}
                                                        {partner.website_link ? (
                                                            <a
                                                                href={partner.website_link}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="value text-decoration-underline text-primary"
                                                            >
                                                                {partner.website_link}
                                                            </a>
                                                        ) : (
                                                            <span className="value">Non spécifié</span>
                                                        )}
                                                    </div>
                                                    <div className="info-row">
                                                        <strong>Date de création :</strong>{" "}
                                                        <span className="value">{new Date(partner.created_at).toLocaleDateString() || "Non spécifiée"}</span>
                                                    </div>
                                                    <div className="info-row">
                                                        <strong>Dernière mise à jour :</strong>{" "}
                                                        <span className="value">{new Date(partner.updated_at).toLocaleDateString() || "Non spécifiée"}</span>
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <div className="info-row">
                                                <span className="value">Aucun partenaire spécifié</span>
                                            </div>
                                        )}
                                    </div>
                                </ProgramInfoAccordionItem>


                            </UncontrolledAccordion>
                        </div>
                    </div>
                </div>
            </div>
        </TabPane>
    );
};

export default ProgramInfo;

