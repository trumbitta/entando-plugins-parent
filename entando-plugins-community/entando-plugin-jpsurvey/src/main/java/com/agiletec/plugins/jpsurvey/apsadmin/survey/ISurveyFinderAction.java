/*
 *
 * Copyright 2005 AgileTec s.r.l. (http://www.agiletec.it) All rights reserved.
 *
 * This file is part of jAPS software.
 * jAPS is a free software; 
 * you can redistribute it and/or modify it
 * under the terms of the GNU General Public License (GPL) as published by the Free Software Foundation; version 2.
 * 
 * See the file License for the specific language governing permissions   
 * and limitations under the License
 * 
 * 
 * 
 * Copyright 2005 AgileTec s.r.l. (http://www.agiletec.it) All rights reserved.
 *
 */
package com.agiletec.plugins.jpsurvey.apsadmin.survey;

import java.util.List;

import com.agiletec.plugins.jpsurvey.aps.system.services.survey.model.SurveyRecord;

public interface ISurveyFinderAction {

	/**
	 * This returns the IDs of all surveys in the system.<br />NOTE: we look for proper surveys ('questionnaire')
	 * @return
	 */
	public List<Integer> getSurveysIds();

	/**
	 * This returns a survey given its ID
	 * @param id the unique identifier of the wanted survey
	 * @return the complete survey object
	 */
	public SurveyRecord getSurvey(Integer id);
	
}