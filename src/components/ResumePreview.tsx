
import { ResumeData } from "@/types";
import { useState, useEffect } from "react";
import templates from "@/data/templates";

interface ResumePreviewProps {
  data: ResumeData;
}

// Template pour le CV moderne
const ModernTemplate = ({ data }: { data: ResumeData }) => {
  const primaryColor = templates.find(t => t.id === data.template)?.primaryColor || "#9b87f5";
  
  return (
    <div className="paper-sheet font-sans">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Section de gauche (informations personnelles) */}
        <div className="w-full md:w-1/3 space-y-6">
          {/* Photo */}
          {data.personalInfo.photoUrl && (
            <div className="flex justify-center">
              <img 
                src={data.personalInfo.photoUrl} 
                alt={`${data.personalInfo.firstName} ${data.personalInfo.lastName}`}
                className="h-40 w-40 object-cover rounded-full border-4"
                style={{borderColor: primaryColor}}
              />
            </div>
          )}
          
          {/* Contact */}
          <div className="space-y-3">
            <h2 className="text-lg font-bold uppercase" style={{color: primaryColor}}>
              Contact
            </h2>
            <div className="space-y-2">
              {data.personalInfo.email && (
                <div>
                  <div className="text-sm font-semibold">Email</div>
                  <div className="text-sm">{data.personalInfo.email}</div>
                </div>
              )}
              {data.personalInfo.phone && (
                <div>
                  <div className="text-sm font-semibold">Téléphone</div>
                  <div className="text-sm">{data.personalInfo.phone}</div>
                </div>
              )}
              {data.personalInfo.address && (
                <div>
                  <div className="text-sm font-semibold">Adresse</div>
                  <div className="text-sm">{data.personalInfo.address}</div>
                </div>
              )}
              {data.personalInfo.website && (
                <div>
                  <div className="text-sm font-semibold">Site web</div>
                  <div className="text-sm">{data.personalInfo.website}</div>
                </div>
              )}
            </div>
          </div>
          
          {/* Compétences */}
          {data.skills?.length > 0 && (
            <div className="space-y-3">
              <h2 className="text-lg font-bold uppercase" style={{color: primaryColor}}>
                Compétences
              </h2>
              <div className="space-y-2">
                {data.skills.map((skill) => (
                  <div key={skill.id}>
                    <div className="text-sm font-semibold">{skill.name}</div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                      <div 
                        className="h-1.5 rounded-full" 
                        style={{
                          width: `${(skill.level / 5) * 100}%`,
                          backgroundColor: primaryColor
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Langues */}
          {data.languages?.length > 0 && (
            <div className="space-y-3">
              <h2 className="text-lg font-bold uppercase" style={{color: primaryColor}}>
                Langues
              </h2>
              <div>
                {data.languages.map((language) => (
                  <div key={language.id} className="mb-1">
                    <span className="font-semibold">{language.name}</span>
                    <span className="text-sm text-gray-600 ml-2">
                      ({language.level === "beginner" 
                        ? "Débutant" 
                        : language.level === "intermediate" 
                        ? "Intermédiaire" 
                        : language.level === "advanced" 
                        ? "Avancé" 
                        : language.level === "fluent" 
                        ? "Courant" 
                        : "Natif"})
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        
        {/* Section de droite (contenu principal) */}
        <div className="w-full md:w-2/3 space-y-6">
          {/* En-tête */}
          <div className="space-y-2">
            <h1 className="text-3xl font-bold">
              {data.personalInfo.firstName} {data.personalInfo.lastName}
            </h1>
            <p className="text-xl" style={{color: primaryColor}}>
              {data.personalInfo.title}
            </p>
          </div>
          
          {/* Résumé */}
          {data.personalInfo.summary && (
            <div className="space-y-3">
              <h2 className="text-lg font-bold uppercase" style={{color: primaryColor}}>
                Profil
              </h2>
              <p className="text-sm">{data.personalInfo.summary}</p>
            </div>
          )}
          
          {/* Expérience professionnelle */}
          {data.experiences?.length > 0 && (
            <div className="space-y-3">
              <h2 className="text-lg font-bold uppercase" style={{color: primaryColor}}>
                Expérience professionnelle
              </h2>
              <div className="space-y-4">
                {data.experiences.map((exp) => (
                  <div key={exp.id}>
                    <div className="flex justify-between">
                      <h3 className="font-semibold">{exp.position}</h3>
                      <p className="text-sm">
                        {new Date(exp.startDate).toLocaleDateString('fr-FR', { year: 'numeric', month: 'short' })} - 
                        {exp.current 
                          ? " Présent"
                          : " " + new Date(exp.endDate).toLocaleDateString('fr-FR', { year: 'numeric', month: 'short' })
                        }
                      </p>
                    </div>
                    <p className="text-sm italic">{exp.company}, {exp.location}</p>
                    <p className="text-sm mt-1">{exp.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Formation */}
          {data.educations?.length > 0 && (
            <div className="space-y-3">
              <h2 className="text-lg font-bold uppercase" style={{color: primaryColor}}>
                Formation
              </h2>
              <div className="space-y-4">
                {data.educations.map((edu) => (
                  <div key={edu.id}>
                    <div className="flex justify-between">
                      <h3 className="font-semibold">{edu.degree} en {edu.field}</h3>
                      <p className="text-sm">
                        {new Date(edu.startDate).toLocaleDateString('fr-FR', { year: 'numeric', month: 'short' })} - 
                        {edu.current
                          ? " Présent"
                          : " " + new Date(edu.endDate).toLocaleDateString('fr-FR', { year: 'numeric', month: 'short' })
                        }
                      </p>
                    </div>
                    <p className="text-sm italic">{edu.institution}, {edu.location}</p>
                    <p className="text-sm mt-1">{edu.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Template pour le CV classique
const ClassicTemplate = ({ data }: { data: ResumeData }) => {
  const primaryColor = templates.find(t => t.id === data.template)?.primaryColor || "#3B82F6";
  
  return (
    <div className="paper-sheet font-serif">
      <div className="text-center border-b-2 pb-4 mb-6" style={{ borderColor: primaryColor }}>
        <h1 className="text-3xl font-bold mb-1">
          {data.personalInfo.firstName} {data.personalInfo.lastName}
        </h1>
        <p className="text-xl" style={{ color: primaryColor }}>
          {data.personalInfo.title}
        </p>
        
        <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 mt-2 text-sm">
          {data.personalInfo.phone && (
            <span>{data.personalInfo.phone}</span>
          )}
          {data.personalInfo.email && (
            <span>{data.personalInfo.email}</span>
          )}
          {data.personalInfo.address && (
            <span>{data.personalInfo.address}</span>
          )}
          {data.personalInfo.website && (
            <span>{data.personalInfo.website}</span>
          )}
        </div>
      </div>
      
      {/* Résumé */}
      {data.personalInfo.summary && (
        <div className="mb-6">
          <h2 className="text-lg font-bold mb-2" style={{ color: primaryColor }}>
            PROFIL
          </h2>
          <p>{data.personalInfo.summary}</p>
        </div>
      )}
      
      {/* Expérience professionnelle */}
      {data.experiences?.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-bold mb-2" style={{ color: primaryColor }}>
            EXPÉRIENCE PROFESSIONNELLE
          </h2>
          {data.experiences.map((exp) => (
            <div key={exp.id} className="mb-4">
              <div className="flex justify-between">
                <h3 className="font-bold">{exp.company}</h3>
                <p>
                  {new Date(exp.startDate).toLocaleDateString('fr-FR', { year: 'numeric', month: 'short' })} - 
                  {exp.current 
                    ? " Présent"
                    : " " + new Date(exp.endDate).toLocaleDateString('fr-FR', { year: 'numeric', month: 'short' })
                  }
                </p>
              </div>
              <p className="italic">{exp.position} | {exp.location}</p>
              <p className="mt-1">{exp.description}</p>
            </div>
          ))}
        </div>
      )}
      
      {/* Formation */}
      {data.educations?.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-bold mb-2" style={{ color: primaryColor }}>
            FORMATION
          </h2>
          {data.educations.map((edu) => (
            <div key={edu.id} className="mb-4">
              <div className="flex justify-between">
                <h3 className="font-bold">{edu.institution}</h3>
                <p>
                  {new Date(edu.startDate).toLocaleDateString('fr-FR', { year: 'numeric', month: 'short' })} - 
                  {edu.current
                    ? " Présent"
                    : " " + new Date(edu.endDate).toLocaleDateString('fr-FR', { year: 'numeric', month: 'short' })
                  }
                </p>
              </div>
              <p className="italic">{edu.degree} en {edu.field} | {edu.location}</p>
              <p className="mt-1">{edu.description}</p>
            </div>
          ))}
        </div>
      )}
      
      {/* Compétences et langues en 2 colonnes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Compétences */}
        {data.skills?.length > 0 && (
          <div>
            <h2 className="text-lg font-bold mb-2" style={{ color: primaryColor }}>
              COMPÉTENCES
            </h2>
            <ul className="list-disc pl-5">
              {data.skills.map((skill) => (
                <li key={skill.id}>{skill.name}</li>
              ))}
            </ul>
          </div>
        )}
        
        {/* Langues */}
        {data.languages?.length > 0 && (
          <div>
            <h2 className="text-lg font-bold mb-2" style={{ color: primaryColor }}>
              LANGUES
            </h2>
            <ul className="list-disc pl-5">
              {data.languages.map((language) => (
                <li key={language.id}>
                  {language.name} - {language.level === "beginner" 
                    ? "Débutant" 
                    : language.level === "intermediate" 
                    ? "Intermédiaire" 
                    : language.level === "advanced" 
                    ? "Avancé" 
                    : language.level === "fluent" 
                    ? "Courant" 
                    : "Natif"}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

// Template pour le CV minimaliste
const MinimalistTemplate = ({ data }: { data: ResumeData }) => {
  const primaryColor = templates.find(t => t.id === data.template)?.primaryColor || "#10B981";
  
  return (
    <div className="paper-sheet font-sans">
      {/* En-tête minimal */}
      <div className="mb-8">
        <h1 className="text-4xl font-light mb-1">
          {data.personalInfo.firstName} {data.personalInfo.lastName}
        </h1>
        <p className="text-xl font-light" style={{ color: primaryColor }}>
          {data.personalInfo.title}
        </p>
      </div>
      
      {/* Disposition en deux colonnes */}
      <div className="flex flex-col md:flex-row gap-12">
        {/* Colonne de gauche - Informations principales */}
        <div className="w-full md:w-2/3 space-y-6">
          {/* Résumé */}
          {data.personalInfo.summary && (
            <div className="space-y-2">
              <h2 className="text-lg uppercase tracking-wider" style={{ color: primaryColor }}>
                À propos
              </h2>
              <hr className="border-t-2 w-12" style={{ borderColor: primaryColor }} />
              <p className="text-sm">{data.personalInfo.summary}</p>
            </div>
          )}
          
          {/* Expérience professionnelle */}
          {data.experiences?.length > 0 && (
            <div className="space-y-2">
              <h2 className="text-lg uppercase tracking-wider" style={{ color: primaryColor }}>
                Expérience
              </h2>
              <hr className="border-t-2 w-12" style={{ borderColor: primaryColor }} />
              <div className="space-y-5">
                {data.experiences.map((exp) => (
                  <div key={exp.id}>
                    <p className="text-xs text-gray-500">
                      {new Date(exp.startDate).toLocaleDateString('fr-FR', { year: 'numeric', month: 'short' })} - 
                      {exp.current 
                        ? " Présent"
                        : " " + new Date(exp.endDate).toLocaleDateString('fr-FR', { year: 'numeric', month: 'short' })
                      }
                    </p>
                    <h3 className="font-medium">{exp.position}</h3>
                    <p className="text-sm">{exp.company}, {exp.location}</p>
                    <p className="text-sm mt-1">{exp.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Formation */}
          {data.educations?.length > 0 && (
            <div className="space-y-2">
              <h2 className="text-lg uppercase tracking-wider" style={{ color: primaryColor }}>
                Formation
              </h2>
              <hr className="border-t-2 w-12" style={{ borderColor: primaryColor }} />
              <div className="space-y-5">
                {data.educations.map((edu) => (
                  <div key={edu.id}>
                    <p className="text-xs text-gray-500">
                      {new Date(edu.startDate).toLocaleDateString('fr-FR', { year: 'numeric', month: 'short' })} - 
                      {edu.current
                        ? " Présent"
                        : " " + new Date(edu.endDate).toLocaleDateString('fr-FR', { year: 'numeric', month: 'short' })
                      }
                    </p>
                    <h3 className="font-medium">{edu.degree} en {edu.field}</h3>
                    <p className="text-sm">{edu.institution}, {edu.location}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        
        {/* Colonne de droite - Informations secondaires */}
        <div className="w-full md:w-1/3 space-y-6">
          {/* Contact */}
          <div className="space-y-2">
            <h2 className="text-lg uppercase tracking-wider" style={{ color: primaryColor }}>
              Contact
            </h2>
            <hr className="border-t-2 w-12" style={{ borderColor: primaryColor }} />
            <div className="space-y-2 text-sm">
              {data.personalInfo.email && (
                <p>{data.personalInfo.email}</p>
              )}
              {data.personalInfo.phone && (
                <p>{data.personalInfo.phone}</p>
              )}
              {data.personalInfo.address && (
                <p>{data.personalInfo.address}</p>
              )}
              {data.personalInfo.website && (
                <p>{data.personalInfo.website}</p>
              )}
            </div>
          </div>
          
          {/* Compétences */}
          {data.skills?.length > 0 && (
            <div className="space-y-2">
              <h2 className="text-lg uppercase tracking-wider" style={{ color: primaryColor }}>
                Compétences
              </h2>
              <hr className="border-t-2 w-12" style={{ borderColor: primaryColor }} />
              <div className="space-y-1">
                {data.skills.map((skill) => (
                  <p key={skill.id} className="text-sm">{skill.name}</p>
                ))}
              </div>
            </div>
          )}
          
          {/* Langues */}
          {data.languages?.length > 0 && (
            <div className="space-y-2">
              <h2 className="text-lg uppercase tracking-wider" style={{ color: primaryColor }}>
                Langues
              </h2>
              <hr className="border-t-2 w-12" style={{ borderColor: primaryColor }} />
              <div className="space-y-1">
                {data.languages.map((language) => (
                  <p key={language.id} className="text-sm">
                    {language.name}
                  </p>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Template professionnel
const ProfessionalTemplate = ({ data }: { data: ResumeData }) => {
  const primaryColor = templates.find(t => t.id === data.template)?.primaryColor || "#6366F1";
  
  return (
    <div className="paper-sheet font-sans">
      {/* En-tête avec bande colorée */}
      <div 
        className="py-6 px-8 mb-6 -mx-8 -mt-8"
        style={{ backgroundColor: primaryColor }}
      >
        <h1 className="text-3xl font-bold text-white">
          {data.personalInfo.firstName} {data.personalInfo.lastName}
        </h1>
        <p className="text-xl text-white opacity-90">
          {data.personalInfo.title}
        </p>
      </div>
      
      {/* Contenu principal en 2 colonnes */}
      <div className="grid grid-cols-3 gap-8">
        {/* Colonne de gauche - Informations de contact et compétences */}
        <div className="col-span-1 space-y-6">
          {/* Contact */}
          <div className="space-y-3">
            <h2 className="text-lg font-bold border-b-2 pb-1 mb-2" style={{ borderColor: primaryColor }}>
              Contact
            </h2>
            <div className="space-y-2 text-sm">
              {data.personalInfo.email && (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full" style={{ backgroundColor: primaryColor }}></div>
                  <span>{data.personalInfo.email}</span>
                </div>
              )}
              {data.personalInfo.phone && (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full" style={{ backgroundColor: primaryColor }}></div>
                  <span>{data.personalInfo.phone}</span>
                </div>
              )}
              {data.personalInfo.address && (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full" style={{ backgroundColor: primaryColor }}></div>
                  <span>{data.personalInfo.address}</span>
                </div>
              )}
              {data.personalInfo.website && (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full" style={{ backgroundColor: primaryColor }}></div>
                  <span>{data.personalInfo.website}</span>
                </div>
              )}
            </div>
          </div>
          
          {/* Compétences */}
          {data.skills?.length > 0 && (
            <div className="space-y-3">
              <h2 className="text-lg font-bold border-b-2 pb-1 mb-2" style={{ borderColor: primaryColor }}>
                Compétences
              </h2>
              <div className="space-y-2">
                {data.skills.map((skill) => (
                  <div key={skill.id} className="space-y-1">
                    <div className="flex justify-between">
                      <span className="font-medium">{skill.name}</span>
                      <span className="text-sm">
                        {skill.level}/5
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div 
                        className="h-1.5 rounded-full" 
                        style={{
                          width: `${(skill.level / 5) * 100}%`,
                          backgroundColor: primaryColor
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Langues */}
          {data.languages?.length > 0 && (
            <div className="space-y-3">
              <h2 className="text-lg font-bold border-b-2 pb-1 mb-2" style={{ borderColor: primaryColor }}>
                Langues
              </h2>
              <div className="space-y-2">
                {data.languages.map((language) => (
                  <div key={language.id} className="flex justify-between">
                    <span>{language.name}</span>
                    <span className="text-sm">
                      {language.level === "beginner" 
                        ? "Débutant" 
                        : language.level === "intermediate" 
                        ? "Intermédiaire" 
                        : language.level === "advanced" 
                        ? "Avancé" 
                        : language.level === "fluent" 
                        ? "Courant" 
                        : "Natif"}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        
        {/* Colonne de droite - Contenu principal */}
        <div className="col-span-2 space-y-6">
          {/* Profil */}
          {data.personalInfo.summary && (
            <div className="space-y-3">
              <h2 className="text-lg font-bold border-b-2 pb-1 mb-2" style={{ borderColor: primaryColor }}>
                Profil
              </h2>
              <p>{data.personalInfo.summary}</p>
            </div>
          )}
          
          {/* Expérience professionnelle */}
          {data.experiences?.length > 0 && (
            <div className="space-y-3">
              <h2 className="text-lg font-bold border-b-2 pb-1 mb-2" style={{ borderColor: primaryColor }}>
                Expérience professionnelle
              </h2>
              <div className="space-y-5">
                {data.experiences.map((exp) => (
                  <div key={exp.id}>
                    <div className="flex justify-between items-center mb-1">
                      <h3 className="font-semibold">{exp.position}</h3>
                      <div className="text-sm px-2 py-0.5 rounded" style={{ backgroundColor: `${primaryColor}20`, color: primaryColor }}>
                        {new Date(exp.startDate).toLocaleDateString('fr-FR', { year: 'numeric', month: 'short' })} - 
                        {exp.current 
                          ? " Présent"
                          : " " + new Date(exp.endDate).toLocaleDateString('fr-FR', { year: 'numeric', month: 'short' })
                        }
                      </div>
                    </div>
                    <p className="text-sm font-medium mb-1">{exp.company}, {exp.location}</p>
                    <p className="text-sm">{exp.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Formation */}
          {data.educations?.length > 0 && (
            <div className="space-y-3">
              <h2 className="text-lg font-bold border-b-2 pb-1 mb-2" style={{ borderColor: primaryColor }}>
                Formation
              </h2>
              <div className="space-y-5">
                {data.educations.map((edu) => (
                  <div key={edu.id}>
                    <div className="flex justify-between items-center mb-1">
                      <h3 className="font-semibold">{edu.degree} en {edu.field}</h3>
                      <div className="text-sm px-2 py-0.5 rounded" style={{ backgroundColor: `${primaryColor}20`, color: primaryColor }}>
                        {new Date(edu.startDate).toLocaleDateString('fr-FR', { year: 'numeric', month: 'short' })} - 
                        {edu.current
                          ? " Présent"
                          : " " + new Date(edu.endDate).toLocaleDateString('fr-FR', { year: 'numeric', month: 'short' })
                        }
                      </div>
                    </div>
                    <p className="text-sm font-medium mb-1">{edu.institution}, {edu.location}</p>
                    <p className="text-sm">{edu.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const ResumePreview = ({ data }: ResumePreviewProps) => {
  const Template = () => {
    switch(data.template) {
      case "classic":
        return <ClassicTemplate data={data} />;
      case "minimalist":
        return <MinimalistTemplate data={data} />;
      case "professional":
        return <ProfessionalTemplate data={data} />;
      case "modern":
      default:
        return <ModernTemplate data={data} />;
    }
  };
  
  return (
    <div className="resume-preview">
      <Template />
    </div>
  );
};

export default ResumePreview;
