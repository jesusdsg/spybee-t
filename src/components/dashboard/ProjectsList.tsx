import { Position, Project, useDataStore } from "@/store/data.store";
import React, { useEffect, useState } from "react";
import { ProjectCard } from "./ProjectCard";
import styles from "@/styles/dashboard/ProjectList.module.css";
import {
  ListBulletIcon,
  Squares2X2Icon,
  MapPinIcon,
  MagnifyingGlassIcon,
  PlusIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";
import ProjectMap from "./ProjectMap";
import { ProjectCardDetail } from "./ProjectCardDetail";

const ITEMS_PER_PAGE = 10;

export const ProjectsList = () => {
  const projects = useDataStore((state) => state.projects);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSortedAsc, setIsSortedAsc] = useState(true);
  const [openPanelList, setOpenPanelList] = useState(false);
  const [sortCriteria, setSortCriteria] = useState<
    "title" | "incidents" | "rfis" | "tasks"
  >("title");

  const [position, setPosition] = useState<Position>({
    _id: "",
    lat: -73.935242,
    lng: 40.73061,
  });

  const [openSidePanel, setOpenSidePanel] = useState(false);

  useEffect(() => {
    setOpenSidePanel(true);
  }, [position]);

  const panelListItems = [
    { id: 1, title: "Orden alfabético" },
    { id: 2, title: "Número de incidencias" },
    { id: 3, title: "Número de RFI" },
    { id: 4, title: "Número de tareas" },
  ];

  const sortByCriteria = (id: number) => {
    switch (id) {
      case 1:
        setSortCriteria("title");
        break;
      case 2:
        setSortCriteria("incidents");
        break;
      case 3:
        setSortCriteria("rfis");
        break;
      case 4:
        setSortCriteria("tasks");
        break;
    }
    setOpenPanelList(false);
  };

  const matchesSearch = (project: Project) => {
    const search = searchTerm.toLowerCase();
    return (
      project.title.toLowerCase().includes(search) ||
      project.incidents?.some(
        (incident) =>
          incident.item?.toLowerCase().includes(search) || //rfi or task
          incident.item?.toLowerCase().includes(search)
      )
    );
  };

  const compareProjects = (a: Project, b: Project) => {
    const sortOrder = isSortedAsc ? 1 : -1;

    switch (sortCriteria) {
      case "title":
        return sortOrder * a.title.localeCompare(b.title);
      case "incidents":
        return sortOrder * (a.incidents?.length - b.incidents?.length);
      case "rfis":
        // looking for the rfis
        const rfiCountA =
          a.incidents?.filter((incident) => incident.item === "rfi").length ||
          0;
        const rfiCountB =
          b.incidents?.filter((incident) => incident.item === "rfi").length ||
          0;
        return sortOrder * (rfiCountA - rfiCountB);
      case "tasks":
        // looking for tasks
        const taskCountA =
          a.incidents?.filter((incident) => incident.item === "task").length ||
          0;
        const taskCountB =
          b.incidents?.filter((incident) => incident.item === "task").length ||
          0;
        return sortOrder * (taskCountA - taskCountB);
      default:
        return 0;
    }
  };

  const filteredProjects = projects
    ?.filter(matchesSearch)
    .sort(compareProjects);

  // Calculate total pages xd
  const totalPages = Math.ceil(
    (filteredProjects?.length || 0) / ITEMS_PER_PAGE
  );

  const paginatedProjects = filteredProjects?.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className={styles.container}>
      <div className={styles.panelContainer}>
        <div className={styles.panelSide}>
          <h1>Mis Proyectos</h1>
          <div className={styles.count}>
            {filteredProjects?.length + " Proyectos"}
          </div>
        </div>

        <div className={styles.panelSide}>
          {/* Buttons */}
          <div className={styles.panelButtonsContainer}>
            <button
              aria-label="Lista"
              onClick={() => setOpenPanelList(!openPanelList)}
            >
              <ListBulletIcon className="icon" />
            </button>
            <button>
              <Squares2X2Icon className="icon" />
            </button>
            <button>
              <MapPinIcon className="icon" />
            </button>

            {/* Fake modal :v */}
            {openPanelList && (
              <div className={styles.panelList}>
                {panelListItems.map((item) => (
                  <button
                    key={item.id}
                    aria-label="Botón menú panel"
                    onClick={() => sortByCriteria(item.id)}
                  >
                    {item.title}
                  </button>
                ))}
              </div>
            )}
          </div>
          {/* Search input */}
          <div className={styles.searchInputContainer}>
            <input
              type="text"
              placeholder="Buscar"
              value={searchTerm}
              className={styles.searchInput}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
            />
            <MagnifyingGlassIcon className="icon" />
          </div>
          <button className={styles.buttonCreate}>
            <PlusIcon className="icon" /> Crear proyecto
          </button>
        </div>
      </div>

      <button
        className={styles.buttonTogglePanel}
        onClick={() => setOpenSidePanel(!openSidePanel)}
      >
        <ChevronLeftIcon className="icon" />
      </button>

      <div className={styles.mainContainer}>
        {/* left */}
        <div
          className={openSidePanel ? styles.leftSideToggled : styles.leftSide}
        >
          {/* the holy map */}
          {openSidePanel && (
            <div className={styles.mapContainer}>
              <ProjectMap position={position} />
            </div>
          )}

          {/* basic header */}
          <div className={styles.headerContainer}>
            <h4>Proyecto</h4>
            <h4></h4>
            <h4>Plan</h4>
            <h4>Estado</h4>
            <h4>Equipo</h4>
            <h4></h4>
            <h4>Items por vencer</h4>
            <h4></h4>
          </div>

          {/* list */}
          {paginatedProjects?.length == 0 && (
            <div
              className={
                openSidePanel ? styles.notFoundToggled : styles.notFound
              }
            >
              No se encontraron coincidencias
            </div>
          )}
          {paginatedProjects?.map((project) => (
            <ProjectCard
              setPosition={setPosition}
              key={project._id}
              project={project}
            />
          ))}

          {/* some controls */}
          <div className={styles.paginationContainer}>
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => prev - 1)}
            >
              <ChevronLeftIcon className="icon" />
            </button>
            <span>
              Página {currentPage} de {totalPages}
            </span>
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((prev) => prev + 1)}
            >
              <ChevronRightIcon className="icon" />
            </button>
          </div>
        </div>
        {/* right */}
        {openSidePanel && (
          <div className={styles.rightSide}>
            <ProjectCardDetail />
          </div>
        )}
      </div>
    </div>
  );
};
