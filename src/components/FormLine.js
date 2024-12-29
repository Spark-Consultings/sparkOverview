import React, { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { Listbox } from '@headlessui/react';
import { motion, AnimatePresence } from 'framer-motion';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { Calendar, Upload, Send, Clock, CheckCircle, ChevronRight } from 'lucide-react';

const FormSteps = ({ currentStep }) => (
    <motion.div 
        className="flex justify-center mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
    >
        {[1, 2, 3].map((step) => (
        <div key={step} className="flex items-center">
            <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ 
                scale: currentStep >= step ? 1 : 0.8,
                opacity: 1
            }}
            transition={{ duration: 0.3, delay: step * 0.1 }}
            className={`w-12 h-12 rounded-full flex items-center justify-center text-white ${
                currentStep >= step ? 'bg-orange-500' : 'bg-gray-500'
            }`}
            >
            {currentStep > step ? (
                <CheckCircle className="w-6 h-6" />
            ) : (
                step
            )}
            </motion.div>
            {step < 3 && (
            <motion.div 
                initial={{ scaleX: 0 }}
                animate={{ scaleX: currentStep > step ? 1 : 0 }}
                transition={{ duration: 0.5 }}
                className={`w-20 h-1 mx-2 rounded origin-left ${
                currentStep > step ? 'bg-orange-500' : 'bg-gray-500'
                }`}
            />
            )}
        </div>
        ))}
    </motion.div>
);

const FormLine = () => {
    const [isRecapOpen, setIsRecapOpen] = useState(false);
    const [isSubmissionSuccessful, setIsSubmissionSuccessful] = useState(false);
    const [date, setDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState("");
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
        projectType: "",
        projectFile: null,
        description: ""
    });

    const projectTypes = [
        { value: "health", label: "Santé" },
        { value: "commerce", label: "Commerce" },
        { value: "education", label: "Éducation" },
        { value: "technology", label: "Technologie" },
        { value: "environment", label: "Environnement" },
    ];

    const availableTimes = [
        "09:00", "10:00", "11:00", "14:00", "15:00", "16:00"
    ];

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFormData(prev => ({ ...prev, projectFile: file }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsRecapOpen(true);
    };

    const handleFinalSubmit = () => {
        console.log({ ...formData, appointmentDate: date, appointmentTime: selectedTime });
        setIsRecapOpen(false);
        setIsSubmissionSuccessful(true);
        setTimeout(() => {
        setIsSubmissionSuccessful(false);
        resetForm();
        }, 3000);
    };

    const resetForm = () => {
        setFormData({
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
        projectType: "",
        projectFile: null,
        description: ""
        });
        setDate(null);
        setSelectedTime("");
        setCurrentStep(1);
    };

    const nextStep = () => {
        setCurrentStep(prev => Math.min(prev + 1, 3));
    };

    const prevStep = () => {
        setCurrentStep(prev => Math.max(prev - 1, 1));
    };

    return (
        <div className="min-h-screen bg-gray-900 py-20 px-4 flex items-center justify-center">
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-6xl"
        >
            <div className="text-center mb-12">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
            >
                <h2 className="text-5xl font-bold text-white mb-4">
                Partagez Votre{" "}
                <span className="bg-gradient-to-r from-orange-400 to-red-500 text-transparent bg-clip-text">
                    Vision
                </span>
                {" "}Avec Nous
                </h2>
                <p className="text-gray-400 max-w-2xl mx-auto">
                Transformez vos idées en réalité. Soumettez votre projet et prenez rendez-vous 
                avec nos experts pour donner vie à votre vision.
                </p>
            </motion.div>
            </div>

            <FormSteps currentStep={currentStep} />

            <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-gray-800/50 backdrop-blur-xl h-[460px] rounded-2xl border border-orange-500/20 p-8 overflow-hidden"
            >
            <form onSubmit={handleSubmit} className="space-y-6">
                <AnimatePresence mode="wait">
                {currentStep === 1 && (
                    <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 50 }}
                    transition={{ duration: 0.3 }}
                    className="grid grid-cols-2 gap-6"
                    >
                    <div className="space-y-2">
                        <label htmlFor="firstName" className="block text-white text-sm font-medium">
                        Prénom
                        </label>
                        <input
                        id="firstName"
                        type="text"
                        placeholder="Votre prénom"
                        className="w-full px-4 py-2 bg-gray-700/50 border border-orange-500/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                        value={formData.firstName}
                        onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                        required
                        />
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="lastName" className="block text-white text-sm font-medium">
                        Nom
                        </label>
                        <input
                        id="lastName"
                        type="text"
                        placeholder="Votre nom"
                        className="w-full px-4 py-2 bg-gray-700/50 border border-orange-500/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                        value={formData.lastName}
                        onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                        required
                        />
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="phone" className="block text-white text-sm font-medium">
                        Téléphone
                        </label>
                        <input
                        id="phone"
                        type="tel"
                        placeholder="Votre numéro"
                        className="w-full px-4 py-2 bg-gray-700/50 border border-orange-500/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                        value={formData.phone}
                        onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                        required
                        />
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="email" className="block text-white text-sm font-medium">
                        Adresse E-mail
                        </label>
                        <input
                        id="email"
                        type="email"
                        placeholder="Votre adresse e-mail"
                        className="w-full px-4 py-2 bg-gray-700/50 border border-orange-500/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                        value={formData.email}
                        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                        required
                        />
                    </div>
                    </motion.div>
                )}

                {currentStep === 2 && (
                    <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 50 }}
                    transition={{ duration: 0.3 }}
                    className="grid grid-cols-2 gap-6"
                    >
                    <div className="space-y-2">
                        <label className="block text-white text-sm font-medium">
                        Type de Projet
                        </label>
                        <Listbox
                        value={formData.projectType}
                        onChange={(value) => setFormData(prev => ({ ...prev, projectType: value }))}
                        >
                        <div className="relative">
                            <Listbox.Button className="w-full px-4 py-2 bg-gray-700/50 border border-orange-500/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500 text-left">
                            {formData.projectType ? 
                                projectTypes.find(type => type.value === formData.projectType)?.label :
                                "Sélectionnez un type"
                            }
                            </Listbox.Button>
                            <Listbox.Options className="absolute w-full mt-1 bg-gray-800 border border-orange-500/20 rounded-lg py-1 text-white z-10">
                            {projectTypes.map((type) => (
                                <Listbox.Option
                                key={type.value}
                                value={type.value}
                                className={({ active }) =>
                                    `${active ? 'bg-orange-500/20' : ''} cursor-pointer px-4 py-2`
                                }
                                >
                                {type.label}
                                </Listbox.Option>
                            ))}
                            </Listbox.Options>
                        </div>
                        </Listbox>
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="projectFile" className="block text-white text-sm font-medium">
                        Document du Projet (PDF)
                        </label>
                        <div className="relative">
                        <input
                            id="projectFile"
                            type="file"
                            accept=".pdf"
                            className="hidden"
                            onChange={handleFileChange}
                        />
                        <button
                            type="button"
                            onClick={() => document.getElementById('projectFile').click()}
                            className="w-full px-4 py-2 bg-gray-700/50 border border-orange-500/20 rounded-lg text-white hover:bg-gray-600/50 focus:outline-none focus:ring-2 focus:ring-orange-500 flex items-center justify-center"
                        >
                            <Upload className="w-4 h-4 mr-2" />
                            {formData.projectFile ? formData.projectFile.name : "Sélectionner un fichier"}
                        </button>
                        </div>
                    </div>
                    <div className="space-y-2 col-span-2">
                        <label htmlFor="description" className="block text-white text-sm font-medium">
                        Description du Projet
                        </label>
                        <textarea
                        id="description"
                        placeholder="Décrivez votre vision du projet..."
                        className="w-full px-4 py-2 bg-gray-700/50 border border-orange-500/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500 min-h-32"
                        value={formData.description}
                        onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                        required
                        />
                    </div>
                    </motion.div>
                )}

                {currentStep === 3 && (
                    <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 50 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                    >
                    <div className="text-white text-center">
                        <h3 className="text-2xl font-bold mb-2">Prendre Rendez-vous</h3>
                        <p>Choisissez une date et un horaire pour votre consultation</p>
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                        <div>
                        <label className="block text-white text-sm font-medium mb-2">
                            Date
                        </label>
                        <DatePicker
                            selected={date}
                            onChange={setDate}
                            minDate={new Date()}
                            className="w-full px-4 py-2 bg-gray-700/50 border z-50 border-orange-500/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                            dateFormat="dd/MM/yyyy"
                        />
                        </div>
                        <div>
                        <label className="block text-white text-sm font-medium mb-2">
                            Horaire Disponible
                        </label>
                        <div className="grid grid-cols-2 gap-2">
                            {availableTimes.map((time) => (
                            <motion.button
                                key={time}
                                type="button"
                                className={`px-4 py-2 rounded-lg ${
                                selectedTime === time 
                                    ? 'bg-orange-500 text-white' 
                                    : 'bg-gray-700/50 border border-orange-500/20 text-white hover:bg-gray-600/50'
                                } focus:outline-none focus:ring-2 focus:ring-orange-500`}
                                onClick={() => setSelectedTime(time)}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                {time}
                            </motion.button>
                            ))}
                        </div>
                        </div>
                    </div>
                    </motion.div>
                )}
                </AnimatePresence>

                <div className="flex justify-between mt-6">
                {currentStep > 1 && (
                    <motion.button
                    type="button"
                    onClick={prevStep}
                    className="px-6 py-2 bg-gray-700/50 border border-orange-500/20 rounded-lg text-white hover:bg-gray-600/50 focus:outline-none focus:ring-2 focus:ring-orange-500 flex items-center"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    >
                    Précédent
                    </motion.button>
                )}
                {currentStep < 3 ? (
                    <motion.button
                    type="button"
                    onClick={nextStep}
                    className="px-6 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-orange-500 flex items-center"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    >
                    Suivant
                    <ChevronRight className="w-4 h-4 ml-2" />
                    </motion.button>
                ) : (
                    <motion.button
                    type="submit"
                    className="px-6 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-orange-500 flex items-center"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    >
                    <Clock className="w-4 h-4 mr-2" />
                    Prendre Rendez-vous
                    </motion.button>
                )}
                </div>
            </form>
            </motion.div>

            {/* Modal de récapitulatif */}
            <Dialog
            open={isRecapOpen}
            onClose={() => setIsRecapOpen(false)}
            className="relative z-50"
            >
            <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" aria-hidden="true" />

            <div className="fixed inset-0 flex items-center justify-center p-4">
                <Dialog.Panel className="mx-auto max-w-2xl w-full bg-gray-800 rounded-2xl p-6">
                <Dialog.Title className="text-2xl font-bold text-white mb-2">
                    Récapitulatif de votre demande
                </Dialog.Title>
                <Dialog.Description className="text-gray-400 mb-6">
                    Vérifiez les détails de votre demande avant de confirmer.
                </Dialog.Description>

                <div className="grid grid-cols-2 gap-4 text-white mb-6">
                    <div>
                    <p className="font-semibold">Nom complet:</p>
                    <p>{formData.firstName} {formData.lastName}</p>
                    </div>
                    <div>
                    <p className="font-semibold">Téléphone:</p>
                    <p>{formData.phone}</p>
                    </div>
                    <div>
                    <p className="font-semibold">Email:</p>
                    <p>{formData.email}</p>
                    </div>
                    <div>
                    <p className="font-semibold">Type de projet:</p>
                    <p>{projectTypes.find(type => type.value === formData.projectType)?.label || 'Non spécifié'}</p>
                    </div>
                    <div className="col-span-2">
                    <p className="font-semibold">Description:</p>
                    <p className="text-sm">{formData.description}</p>
                    </div>
                    <div>
                    <p className="font-semibold">Date du rendez-vous:</p>
                    <p>{date ? date.toLocaleDateString() : 'Non spécifié'}</p>
                    </div>
                    <div>
                    <p className="font-semibold">Heure du rendez-vous:</p>
                    <p>{selectedTime || 'Non spécifié'}</p>
                    </div>
                </div>

                <div className="flex justify-end gap-4">
                    <motion.button
                    type="button"
                    onClick={() => setIsRecapOpen(false)}
                    className="px-4 py-2 bg-gray-700/50 border border-orange-500/20 rounded-lg text-white hover:bg-gray-600/50 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    >
                    Modifier
                    </motion.button>
                    <motion.button
                    type="button"
                    onClick={handleFinalSubmit}
                    className="px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    >
                    Confirmer le rendez-vous
                    </motion.button>
                </div>
                </Dialog.Panel>
            </div>
            </Dialog>

            {/* Animation de succès */}
            <AnimatePresence>
            {isSubmissionSuccessful && (
                <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="fixed inset-0 flex items-center justify-center z-50"
                >
                <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white p-8 rounded-lg shadow-lg text-center">
                    <CheckCircle className="w-16 h-16 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold mb-2">Demande envoyée avec succès!</h3>
                    <p>Nous vous contacterons bientôt pour confirmer votre rendez-vous.</p>
                </div>
                </motion.div>
            )}
            </AnimatePresence>
        </motion.div>
        </div>
    );
};

export default FormLine;

