"use client";

import { useState, useEffect } from "react";
import AdminLayout from "@/components/layouts/AdminLayout";
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDocs,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Service } from "@/types";
import {
  FaCode,
  FaMobile,
  FaPaintBrush,
  FaStore,
  FaBrain,
  FaTools,
  FaDatabase,
  FaCloud,
  FaRobot,
  FaShieldAlt,
  FaDesktop,
  FaChartLine,
} from "react-icons/fa";

const availableIcons = {
  FaCode,
  FaMobile,
  FaPaintBrush,
  FaStore,
  FaBrain,
  FaTools,
  FaDatabase,
  FaCloud,
  FaRobot,
  FaShieldAlt,
  FaDesktop,
  FaChartLine,
};

export default function AdminServices() {
  const [services, setServices] = useState<Service[]>([]);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    icon: "FaCode",
  });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "services"));
      const servicesData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Service[];
      setServices(servicesData);
    } catch (error) {
      console.error("Error fetching services:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const serviceData = {
        title: formData.title,
        description: formData.description,
        icon: formData.icon,
      };

      if (editingService?.id) {
        await updateDoc(doc(db, "services", editingService.id), serviceData);
      } else {
        await addDoc(collection(db, "services"), serviceData);
      }

      resetForm();
      fetchServices();
    } catch (error) {
      console.error("Error saving service:", error);
    }
  };

  const handleDelete = async (serviceId: string) => {
    if (window.confirm("Tem certeza que deseja excluir este serviço?")) {
      try {
        await deleteDoc(doc(db, "services", serviceId));
        fetchServices();
      } catch (error) {
        console.error("Error deleting service:", error);
      }
    }
  };

  const handleEdit = (service: Service) => {
    setEditingService(service);
    setFormData({
      title: service.title,
      description: service.description,
      icon: typeof service.icon === "string" ? service.icon : "",
    });
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      icon: "FaCode",
    });
    setEditingService(null);
  };

  const SelectedIcon =
    availableIcons[formData.icon as keyof typeof availableIcons];

  return (
    <AdminLayout>
      <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8 px-4 sm:px-0">
        <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
          Gerenciar Serviços
        </h1>

        <form
          onSubmit={handleSubmit}
          className="bg-white/5 backdrop-blur-sm p-4 sm:p-8 rounded-xl border border-gray-700/50"
        >
          <div className="space-y-4 sm:space-y-6">
            <div>
              <label className="block mb-2 text-sm sm:text-base text-gray-300 font-medium">
                Título
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                className="w-full p-2.5 sm:p-3 text-sm sm:text-base bg-white/5 border border-gray-700 rounded-lg 
                  text-gray-200 placeholder-gray-500 focus:border-blue-500 focus:ring-1 
                  focus:ring-blue-500 transition-colors"
                required
              />
            </div>

            <div>
              <label className="block mb-2 text-sm sm:text-base text-gray-300 font-medium">
                Descrição
              </label>
              <textarea
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className="w-full p-2.5 sm:p-3 text-sm sm:text-base bg-white/5 border border-gray-700 rounded-lg 
                  text-gray-200 placeholder-gray-500 focus:border-blue-500 focus:ring-1 
                  focus:ring-blue-500 transition-colors"
                rows={4}
                required
              />
            </div>

            <div>
              <label className="block mb-2 text-sm sm:text-base text-gray-300 font-medium">
                Ícone
              </label>
              <select
                value={formData.icon}
                onChange={(e) =>
                  setFormData({ ...formData, icon: e.target.value })
                }
                className="w-full p-2.5 sm:p-3 text-sm sm:text-base bg-white/5 border border-gray-700 rounded-lg 
                  text-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              >
                {Object.keys(availableIcons).map((iconName) => (
                  <option
                    key={iconName}
                    value={iconName}
                    className="bg-[#1a1f2e]"
                  >
                    {iconName}
                  </option>
                ))}
              </select>
              <div className="mt-2 p-4 bg-white/5 rounded-lg flex justify-center">
                <SelectedIcon className="w-6 h-6 sm:w-8 sm:h-8 text-blue-400" />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-end gap-3 sm:gap-4 pt-4">
              <button
                type="button"
                onClick={resetForm}
                className="w-full sm:w-auto px-4 sm:px-6 py-2.5 bg-gray-700/50 text-gray-300 rounded-lg 
                  hover:bg-gray-700 transition-colors border border-gray-600 text-sm sm:text-base"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="w-full sm:w-auto px-4 sm:px-6 py-2.5 bg-blue-600 text-white rounded-lg 
                  hover:bg-blue-500 transition-all duration-300 text-sm sm:text-base"
              >
                {editingService ? "Atualizar" : "Adicionar"} Serviço
              </button>
            </div>
          </div>
        </form>

        <div className="space-y-4">
          {services.map((service) => {
            const ServiceIcon =
              availableIcons[service.icon as keyof typeof availableIcons];
            return (
              <div
                key={service.id}
                className="bg-white/5 backdrop-blur-sm p-4 sm:p-6 rounded-xl border border-gray-700/50
                  hover:border-blue-500/50 transition-all duration-300"
              >
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <div className="flex items-center gap-4 flex-1">
                    <ServiceIcon className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400 flex-shrink-0" />
                    <div>
                      <h3 className="text-base sm:text-lg font-semibold text-white">
                        {service.title}
                      </h3>
                      <p className="text-sm sm:text-base text-gray-400 mt-1">
                        {service.description}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2 self-end sm:self-center">
                    <button
                      onClick={() => handleEdit(service)}
                      className="flex-1 sm:flex-none text-sm text-blue-400 hover:text-blue-300 px-3 py-1.5
                        bg-blue-500/10 rounded-lg hover:bg-blue-500/20 transition-colors"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => service.id && handleDelete(service.id)}
                      className="flex-1 sm:flex-none text-sm text-red-400 hover:text-red-300 px-3 py-1.5
                        bg-red-500/10 rounded-lg hover:bg-red-500/20 transition-colors"
                    >
                      Excluir
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </AdminLayout>
  );
}
