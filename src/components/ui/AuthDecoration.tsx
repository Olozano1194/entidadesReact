const IMAGES = {
    topLeft: "https://lh3.googleusercontent.com/aida-public/AB6AXuC33YpMsZ4DMSp4eY13-69hI-J5sMlSnEd3HSoPT4gf2FYqks_cxEKbgORp9xlD662Y8GTqmgp7M1bqFEKW97txO-tsmPfktVMoc6PYhMiK_3SHN1cJi4t8E1ngKL526l_2_1N3TFhEblSahYkHIEjjDBsM3EwELiex9kjFYYReIHQ0DRzIHS_XowHksQKUIZZiES4SY_JAf4epsQclfMZZOTp7tyFPyQrtpNU1JcU2h4-QuMG14HLZQeZUMNylQZLeFyShMU0t0UW8",
    bottomRight: "https://lh3.googleusercontent.com/aida-public/AB6AXuAx73-87HdsToUCP2V1FuZFJWnRUtXRoODL228OXthmeg8cGmBfU-tULofPsVqtEMrYGwyodfnqrpELU4RyTJ0tyTFeqNu35od6soNuFXb1i_jAvexB949THO0t3jEEF7Ge8yz5i1SZhFu1ge-onLCVcIVZPnXvW7SDn--rxTMCMdMRRWibDU6DTyd6H3bzJXYYJYMHBdkT4-NB05Q2b4yjjGrn-Z_jbhHA4JX36DRg8Xr0QYEIWhYGRY4sc_cIA11kmQwagqaQ9qfj",
};

const AuthDecoration = () => {
    return (
        <>
            <section className="absolute hidden left-10 opacity-40 top-10 lg:block">
                <img
                    src={IMAGES.topLeft}
                    alt="Decoración educativa"
                    className="h-32 object-cover rounded-2xl rotate-3 shadow-2xl w-32"
                />
            </section>
            <section className="absolute bottom-10 hidden opacity-40 right-10 lg:block">
                <img
                    src={IMAGES.bottomRight}
                    alt="Libros de biblioteca"
                    className="h-40 object-cover rounded-2xl -rotate-6 shadow-2xl w-40"
                />
            </section>
        </>
    );
};
export default AuthDecoration;