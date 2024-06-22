import React, { useState } from 'react';
import ImageUploadForm from './ImageUploadForm';
import { Bar } from 'react-chartjs-2';
const ComponentWeb = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [result, setResult] = useState(null);
  const [maxProbability, setMaxProbability] = useState(null);
  const [error, setError] = useState(null);
  const [individualProbabilities, setIndividualProbabilities] = useState({});

  const handleImageChange = (e) => {
    setSelectedImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('image', selectedImage);

      const response = await fetch('http://localhost:5000/classify-waste', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to classify waste');
      }

      const resultData = await response.json();
      setResult(resultData.result);
      setMaxProbability(resultData.max_probability.toFixed(4));
      setIndividualProbabilities(resultData.individual_probabilities);
      

      if (resultData.max_probability < 0.90) {
        setError('Please provide a clear image.');
        setIndividualProbabilities(Object.entries(resultData.individual_probabilities));
      } else {
        setError(null);
        // setClassProbabilities(Object.entries(resultData.individual_probabilities));
        setIndividualProbabilities(Object.entries(resultData.individual_probabilities));
      }
    } catch (error) {
      setError(error.message);
      setResult(null);
      setMaxProbability(null);
      setIndividualProbabilities({});
    }
  };

  

  return (
    <div>

      <>
        <header id="header" className="fixed-top ">
          <div className="container d-flex align-items-center">
            <h1 className="logo me-auto">
              <a href="index.html">Waste Management System</a>
            </h1>
            <nav id="navbar" className="navbar">
              <ul>
                <li>
                  <a className="nav-link scrollto active" href="#hero">
                    <span className="fa fa-home"> Home </span>
                  </a>
                </li>
                <li>
                  <a className="nav-link scrollto" href="#about">
                    <span className="fa fa-info-circle" aria-hidden="true">
                      {" "}
                      About us
                    </span>
                  </a>
                </li>
                <li>
                  <a className="nav-link scrollto" href="#faq">
                    <span className="fa fa-question-circle"> FAQ</span>
                  </a>
                </li>
              </ul>
              <i className="bi bi-list mobile-nav-toggle" />
            </nav>
          </div>
        </header>
        <section id="hero" className="d-flex align-items-center">
          <div className="container">
            <div className="row">
              <div
                className="col-lg-6 d-flex flex-column justify-content-center pt-4 pt-lg-0 order-2 order-lg-1"
                data-aos="fade-up"
                data-aos-delay={200}
              >
                {/* <h1>Better Solutions For The Waste Around You!</h1>
          <h2>Keep our Environment Healthy</h2> */}
                <div className="d-flex justify-content-center justify-content-lg-start">
                  <div className="page">
                    <p></p>
                    
                    <div>
                      <form onSubmit={handleSubmit}>
                        <label htmlFor="photo" className="custom-button">
                          Upload Photo
                          <input
                            type="file"
                            accept="image/png, image/jpeg, image/gif"
                            name="photo"
                            id="photo"
                            onChange={handleImageChange}
                          />
                        </label>
                        <br />
                        <br />
                        {/* <input type="file" accept="image/*" onChange={handleImageChange} /> */}
                        <button type="submit" className='classify-button'>Classify Waste</button>

                       
                      </form>


            
<div className='result-box'>
{result && maxProbability && (
        <div>
          <p>Result: {result}</p>
          <p>Probability: {maxProbability*100}%</p>
        </div>
      )}


      {error && <p>Error: {error}</p>}
    </div>
    </div>

    

              
                  </div>
                  {/* <a href="https://youtu.be/mQ93IcGCag4" class="glightbox btn-watch-video"><i class="bi bi-play-circle"></i><span>Watch Video</span></a> */}
                </div>
              </div>
              <div
                className="col-lg-6 order-1 order-lg-2 hero-img"
                data-aos="zoom-in"
                data-aos-delay={200}
              >
                <img
                  src="assets/img/recycling.jpeg"
                  className="img-fluid animated"
                  alt=""
                />
              </div>
            </div>
          </div>
        </section>
        <main id="main">
          <section id="skills" className="skills">
            <div className="container" data-aos="fade-up">
              <div className="row">
                <div
                  className="col-lg-6 d-flex align-items-center"
                  data-aos="fade-right"
                  data-aos-delay={100}
                >
                  {selectedImage && (
                    <div className="image-preview">
                      <h2>Uploaded Image:</h2>
                      <img
                        src={URL.createObjectURL(selectedImage)}
                        alt="Uploaded Preview"
                        className="uploaded-image"
                      />
                    </div>
                  )}
                </div>

                <div
                  className="col-lg-6 pt-4 pt-lg-0 content"
                  data-aos="fade-left"
                  data-aos-delay={100}
                >




<h3>Clasfication and Percentage of waste</h3>

<div className="skills-content">
  {Array.isArray(individualProbabilities) && individualProbabilities.map(([className, probability]) => (
    <div className="progress" key={className}>
      <span className="skill">
        {className} <i className="val">{probability.toFixed(2)}%</i>
      </span>
      <div className="progress-bar-wrap">
        <div
          className="progress-bar"
          role="progressbar"
          style={{ width: `${probability}%` }}
          aria-valuenow={probability}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>
    </div>
  ))}
</div>






                
                </div>
              </div>
            </div>
          </section>


          <br />
          <br />
          <br />
          <br />
         
          <section id="about" className="about">
            <div className="container" data-aos="fade-up">
            
              <div className="row">
              {/* <div className="container d-flex align-items-center">
            <h3>How to Decompose the Waste</h3>
            </div> */}
            <div className="section-title">
                <h2>How to Decompose the Waste</h2>
              </div>
                <div className="col-md-3 d-flex align-items-center">
                  <a href="https://ecolifegreen.in/what-is-dry-waste-and-why-is-recycling-important/">
                    <img
                      src="assets/img/drywaste232002.jpg"
                      alt="Clickable Image"
                      className="img-fluid" // Add this class to make the image responsive
                    />
                  </a>
                </div>
                <div className="col-md-3 d-flex align-items-center">
                  <a href="https://en.wikipedia.org/wiki/Biodegradable_waste">
                    <img
                      src="assets/img/wetwaste232002.jpg"
                      alt="Clickable Image"
                      className="img-fluid"
                    />
                  </a>
                </div>
                <div className="col-md-3 d-flex align-items-center">
                  <a href="https://en.wikipedia.org/wiki/Electronic_waste">
                    <img
                      src="assets/img/ewaste232002.jpg"
                      alt="Clickable Image"
                      className="img-fluid"
                    />
                  </a>
                </div>
                <div className="col-md-3 d-flex align-items-center">
                  <a href="https://en.wikipedia.org/wiki/Biomedical_waste">
                    <img
                      src="assets/img/biomedwaste232002.jpg"
                      className="img-fluid animated"
                      alt=""
                    />
                  </a>
                </div>
              </div>
            </div>
          </section>


          <section id="about" className="about">
            <div className="container" data-aos="fade-up">
              <div className="section-title">
                <h2>About Us</h2>
              </div>
              <div className="row content">
                <div className="col-lg-6">
                  <p>
                    Gservice stands at the forefront of waste management innovation,
                    employing cutting-edge image recognition to classify waste into
                    distinct categories such as electric, dry, wet, and biomedical.
                  </p>
                  <ul>
                    <li>
                      <i className="ri-check-double-line" />
                      Waste segregation reduces environmental impact,promotes
                      sustainability,and minimizes landfill use.
                    </li>
                    <li>
                      <i className="ri-check-double-line" />
                      Waste segregation cuts costs by management processes and
                      minimizing environmental impact.
                    </li>
                    <li>
                      <i className="ri-check-double-line" />
                      People can take different ideas regarding recycling of waste
                      through this Gservice.
                    </li>
                  </ul>
                </div>
                <div className="col-lg-6 pt-4 pt-lg-0">
                  <p>
                    Going beyond mere categorization, our app serves as an educational
                    hub, offering users information on how to responsibly recycle each
                    type of waste.With clear guidance on disposal methods and
                    locations, GService transforms environmental awareness into
                    tangible action. Our roadmap includes ongoing enhancements,
                    integrating real-time data updates and user-driven features to
                    ensure 'GService' remains the definitive solution for informed and
                    sustainable waste practices.
                  </p>
                  <a href="#" className="btn-learn-more">
                    Learn More
                  </a>
                </div>
              </div>
            </div>
          </section>
          
          <section id="faq" className="faq section-bg">
            <div className="container" data-aos="fade-up">
              <div className="section-title">
                <h2>Frequently Asked Questions</h2>
                <p>Waste management regulations and disposal methods.</p>
              </div>
              <div className="faq-list">
                <ul>
                  <li data-aos="fade-up" data-aos-delay={100}>
                    <i className="bx bx-help-circle icon-help" />
                    <a
                      data-bs-toggle="collapse"
                      className="collapse"
                      data-bs-target="#faq-list-1"
                    >
                     
                      What is waste management?{" "}
                      <i className="bx bx-chevron-down icon-show" />
                      <i className="bx bx-chevron-up icon-close" />
                    </a>
                    <div
                      id="faq-list-1"
                      className="collapse show"
                      data-bs-parent=".faq-list"
                    >
                      <p>
                        Waste management is the collection, transportation and
                        disposal of waste materials.{" "}
                      </p>
                    </div>
                  </li>
                  <li data-aos="fade-up" data-aos-delay={200}>
                    <i className="bx bx-help-circle icon-help" />{" "}
                    <a
                      data-bs-toggle="collapse"
                      data-bs-target="#faq-list-2"
                      className="collapsed"
                    >
                      {" "}
                      How do I practice waste management at home?{" "}
                      <i className="bx bx-chevron-down icon-show" />
                      <i className="bx bx-chevron-up icon-close" />
                    </a>
                    <div
                      id="faq-list-2"
                      className="collapse"
                      data-bs-parent=".faq-list"
                    >
                      <p>
                        Keep separate containers for dry and wet waste in the kitchen.
                        Keep two bags for dry waste collection- paper and plastic, for
                        the rest of the household waste. Keep plastic from the kitchen
                        clean and dry and drop into the dry waste bin. Keep glass
                        /plastic containers rinsed of food matter. Keep a paper bag
                        for throwing sanitary waste.{" "}
                      </p>
                    </div>
                  </li>
                  <li data-aos="fade-up" data-aos-delay={300}>
                    <i className="bx bx-help-circle icon-help" />{" "}
                    <a
                      data-bs-toggle="collapse"
                      data-bs-target="#faq-list-3"
                      className="collapsed"
                    >
                      {" "}
                      What are the first few steps to initiate a waste management
                      programme in your apartment complex?
                      <i className="bx bx-chevron-down icon-show" />
                      <i className="bx bx-chevron-up icon-close" />
                    </a>
                    <div
                      id="faq-list-3"
                      className="collapse"
                      data-bs-parent=".faq-list"
                    >
                      <p>
                        Form a group with like-minded people. Explain waste
                        segregation to your family / neighbours in your apartment
                        building. Get the staff in the apartment building to also
                        understand its importance. Get separate storage drums for
                        storing dry and wet waste. Have the dry waste picked up by the
                        dry waste collection centre or your local scrap dealer.{" "}
                      </p>
                    </div>
                  </li>
                  <li data-aos="fade-up" data-aos-delay={400}>
                    <i className="bx bx-help-circle icon-help" />{" "}
                    <a
                      data-bs-toggle="collapse"
                      data-bs-target="#faq-list-4"
                      className="collapsed"
                    >
                      What are the different types of waste?{" "}
                      <i className="bx bx-chevron-down icon-show" />
                      <i className="bx bx-chevron-up icon-close" />
                    </a>
                    <div
                      id="faq-list-4"
                      className="collapse"
                      data-bs-parent=".faq-list"
                    >
                      <p>
                        1. Wet waste- Wet waste consists of kitchen waste - including
                        vegetable and fruit peels and pieces, tea leaves, coffee
                        grounds, eggshells, bones and entrails, fish scales, as well
                        as cooked food (both veg and non-veg).
                        <br />
                        <br />
                        2. Dry Waste- Paper, plastics, metal, glass, rubber,
                        thermocol, styrofoam, fabric, leather, rexine, wood – anything
                        that can be kept for an extended period without decomposing is
                        classified as dry waste.
                        <br />
                        <br />
                        3 .Hazardous waste- Household hazardous waste or HHW include
                        three sub-categories – E-waste; toxic substances such as
                        paints, cleaning agents, solvents, insecticides and their
                        containers, other chemicals; and biomedical waste.
                        <br />
                        <br />
                        4. E-waste- E-waste or electronic waste consists of batteries,
                        computer parts, wires, electrical equipment of any kind,
                        electrical and electronic toys, remotes, watches, cell phones,
                        bulbs, tube lights and CFLs.
                        <br />
                        <br />
                        5. Biomedical waste- This includes used menstrual cloth,
                        sanitary napkins, disposable diapers, bandages and any
                        material that is contaminated with blood or other body fluids.
                      </p>
                    </div>
                  </li>
                  <li data-aos="fade-up" data-aos-delay={500}>
                    <i className="bx bx-help-circle icon-help" />{" "}
                    <a
                      data-bs-toggle="collapse"
                      data-bs-target="#faq-list-5"
                      className="collapsed"
                    >
                      What are ways of storing the waste at homes?{" "}
                      <i className="bx bx-chevron-down icon-show" />
                      <i className="bx bx-chevron-up icon-close" />
                    </a>
                    <div
                      id="faq-list-5"
                      className="collapse"
                      data-bs-parent=".faq-list"
                    >
                      <p>
                        1. Dry waste- Store it in a bag in the utility area after
                        cleaning and drying till it is picked up. No food residue must
                        be left in the bottles and packets. Clean them as you would to
                        reuse them. If clothes are totally unusable, or very damaged,
                        they are categorized as dry waste. If clothes are soiled with
                        body fluids, they become sanitary waste. If they are soiled
                        with paint, or any chemicals, they are HHW (household
                        hazardous waste).
                        <br />
                        <br /> 2. E-waste- Store them in separate container which is
                        kept closed, away from moisture and in which nothing else is
                        put.{" "}
                      </p>
                    </div>
                  </li>
                  <li data-aos="fade-up" data-aos-delay={600}>
                    <i className="bx bx-help-circle icon-help" />{" "}
                    <a
                      data-bs-toggle="collapse"
                      data-bs-target="#faq-list-6"
                      className="collapsed"
                    >
                      How do I dispose my waste?{" "}
                      <i className="bx bx-chevron-down icon-show" />
                      <i className="bx bx-chevron-up icon-close" />
                    </a>
                    <div
                      id="faq-list-5"
                      className="collapse"
                      data-bs-parent=".faq-list"
                    >
                      <p>
                        1. Compost your wet waste at home- Home composting can easily
                        be done in any aerated container. Get more details on
                        composting and begin composting today!
                        <br />
                        <br />
                        2 Compost your wet waste at the community level- If you live
                        in a large apartment building, a community composting system
                        like tank composting could be set up for all the wet waste
                        from the residents. If not, the wet waste can be given out
                        every day to your Municipality collection system.
                        <br />
                        <br />3 Biomedical waste has to be wrapped separately in a
                        newspaper and handed over to the municipality waste collection
                        system. Expired medicines and injections, used syringes also
                        have to be disposed in the same manner. Paint and other
                        hazardous waste like cosmetics, mosquito repellents, tube
                        lights etc have to be stored separately and handed over to the
                        Municipal collection system.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </section>
        </main>
      </>

    </div>
  )
}

export default ComponentWeb;