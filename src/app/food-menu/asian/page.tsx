import Link from "next/link";
import Image from "next/image";
import Header from "../../components/Header/Header";
import backgroundImage from "../../../../public/assets/ysabel-2.jpg";

const menuCategories = [
    {
        label: "Foods",
        href: "/assets/menus/Asian_Menu.pdf",
    },
    {
        label: "Desserts",
        href: "/assets/menus/Asian_DessertsMenu.pdf",
    },
    {
        label: "Drinks",
        href: "/assets/menus/Asian_DrinksMenu.pdf",
    },
    {
        label: "Wine List",
        href: "/assets/menus/Asian_WL.pdf",
    },
];

const AsianMenuPage = () => {
    return (
        <div className="relative min-h-screen bg-[#1D3428] text-white overflow-hidden">
            <Image
                src={backgroundImage}
                alt="Asian menu background"
                fill
                priority
                className="object-cover opacity-30"
                sizes="100vw"
            />
            <div className="absolute inset-0 bg-[#1D3428]/70" />
            <div className="relative z-10 flex min-h-screen flex-col">
                <Header />
                <main className="flex flex-1 items-center justify-center px-6 py-20 md:px-12 lg:px-24">
                    <div className="relative w-full max-w-4xl  bg-white/5 p-8 text-center shadow-[0_35px_80px_rgba(0,0,0,0.35)] backdrop-blur-xl md:p-14">
                        <div className="relative flex flex-col items-center gap-6 md:gap-8">
                           
                            <h1 className="text-4xl font-rhiffiral md:text-6xl">Asian Menu</h1>
                            <p className="max-w-xl text-sm leading-relaxed text-white/75 md:text-base">
                                Indulge in our chef-crafted Asian menus. Choose a category to open the detailed PDF
                                with seasonal desserts and handcrafted beverages designed to complement your dining
                                experience.
                            </p>
                            <div className="grid w-full gap-3 pt-6 sm:flex sm:flex-wrap sm:items-center sm:justify-center sm:gap-4 sm:pt-4">
                                {menuCategories.map((category) => (
                                    <Link
                                        key={category.label}
                                        href={category.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group inline-flex items-center justify-center border border-white/20 bg-[#0F1A15]/60 px-10 py-4 text-sm font-semibold uppercase tracking-[0.35em] transition-all duration-300 hover:-translate-y-1 hover:border-white hover:bg-[#B5612C]/70 hover:shadow-[0_18px_40px_rgba(0,0,0,0.35)] md:text-base"
                                    >
                                        {category.label}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default AsianMenuPage;
